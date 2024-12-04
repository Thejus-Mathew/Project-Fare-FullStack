import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import proImg from '../assets/images/projectImage.png'
import { Flip, toast, ToastContainer } from 'react-toastify';
import { addProjectApi } from '../services/allAPI';
import { addProjectContextResponse } from '../ContextApi/ContextShare';


function Addproject() {
  const{addProjectResponse,setAddProjectResponse}=useContext(addProjectContextResponse)

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setProjectData({
      title:"",
      languages:"",
      github:"",
      website:'',
      overview:"",
      projectImage:""
    })
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const[projectData,setProjectData]=useState({
    title:"",
    languages:"",
    github:"",
    website:'',
    overview:"",
    projectImage:""
  })

  const[fileStatus,setFileStatus]=useState(false)
  const[preview,setPreview]=useState("")

  useEffect(()=>{
  let type = projectData.projectImage?.type
  if(type=='image/png' || type=='image/jpg' || type=='image/jpeg'){
    setFileStatus(true)
    setPreview(URL.createObjectURL(projectData.projectImage))
  }else{
    setFileStatus(false)
    setPreview("")
    setProjectData({...projectData,projectImage:""})
  }
  },[projectData.projectImage])  

  const addProjects =async ()=>{
    const {title,languages,github,website,overview,projectImage}=projectData
    if(title=="" || languages=="" || github=="" || website=="" || overview=="" || projectImage=="") {
      toast.info("Fill empty fields")
    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHead = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        try{
          const result = await addProjectApi(reqBody,reqHead)
          if(result.status == 200){
            setAddProjectResponse(result.data)
            handleClose()
          }else{
            console.log(result.response.data);
          }
        }catch(err){
          console.log(err);
        }
        
      }
    }
  }

  return (
    <>
      <ToastContainer position="top-center" theme="colored" transition={Flip} />
      <Button variant="primary" onClick={handleShow}>
        Add Projects
      </Button>
      <Modal 
      show={show} 
      onHide={handleClose}
      backdrop = "static"
      keyboard={false}
      size='lg'
      centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <label className='w-100'>
                <input type="file" accept='image/*' style={{display:"none"}} onChange={(e)=>setProjectData({...projectData,projectImage:e.target.files[0]})}/>
                <img width={"100%"} src={fileStatus?preview:proImg} alt="" />
              </label>
              {!fileStatus?<div className='text-danger'>Please upload the following extensions (jpeg/png/jpg)</div>:<div className='text-success mt-3'>Image uploaded successfully</div>}
            </div>
            <div className="col-6">
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Project Title' value={projectData.title} onChange={(e)=>setProjectData({...projectData,title:e.target.value})}/>
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Languages Used' value={projectData.languages} onChange={(e)=>setProjectData({...projectData,languages:e.target.value})}/>
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='GitHub Link' value={projectData.github} onChange={(e)=>setProjectData({...projectData,github:e.target.value})}/>
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Website Link' value={projectData.website} onChange={(e)=>setProjectData({...projectData,website:e.target.value})}/>
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Project Overview' value={projectData.overview} onChange={(e)=>setProjectData({...projectData,overview:e.target.value})}/>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addProjects}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Addproject
