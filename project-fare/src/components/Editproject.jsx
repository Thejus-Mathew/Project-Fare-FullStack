import React, {  useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Flip, toast, ToastContainer } from 'react-toastify';
import {  editProjectApi } from '../services/allAPI';
import { serverURL } from '../services/serverURL';
import { editProjectContextResponse } from '../ContextApi/ContextShare';


function Editproject({project}) {
  const{editProjectResponse,setEditProjectResponse}=useContext(editProjectContextResponse)


  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => setShow(true);

  const[projectData,setProjectData]=useState({...project,projectImage:""})
  const[preview,setPreview]=useState("")

  useEffect(()=>{
    if(projectData.projectImage){
      setPreview(URL.createObjectURL(projectData.projectImage))
    }else{
      setPreview("")
    }
  },[projectData.projectImage])

  const handleUpdate = async ()=>{
    const {title,languages,github,website,overview,projectImage}=projectData
    if(title=="" || languages=="" || github=="" || website=="" || overview=="") {
      toast.info("Fill empty fields")
    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",preview?projectImage:project.projectImage)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHead = {
          "Content-Type":preview?"multipart/form-data":"application/json",
          "Authorization":`Bearer ${token}`
        }
        try{
          const result =await editProjectApi(project._id,reqBody,reqHead)
          if(result.status == 200){
            handleClose()
            setEditProjectResponse(result.data)
          }else{
            toast.warn(result.message)
            console.log(result);
            
          }
        }catch(err){
          toast.warn(err)
        }
      }
    }
  }
  

  return (
    <>
      <ToastContainer position="top-center" theme="colored" transition={Flip} />
      <button className='btn text-dark' onClick={handleShow}><i className="fa-solid fa-pen-to-square"></i></button>
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
                <img width={"100%"} src={preview?preview: `${serverURL}/uploads/${project?.projectImage}`} alt="" />
              </label>
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
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Editproject