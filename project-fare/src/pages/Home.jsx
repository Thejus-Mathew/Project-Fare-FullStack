import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import titleImage from '../assets/images/image1.gif'
import Projectcard from '../components/Projectcard'
import { Link, useNavigate } from 'react-router-dom'
import { getHomeProjectApi } from '../services/allAPI'
import { Flip, toast, ToastContainer } from 'react-toastify'

function Home() {

  const[loggedIn,setLoggedIn]=useState(false)
  const[projects,setProjects]=useState([])


  useEffect(()=>{
    getHomeProjects()
    const token = sessionStorage.getItem("token")
    if(token){
      setLoggedIn(true)
    }
  },[])

  
  const navigate = useNavigate()


  const getHomeProjects = async ()=>{
    const result = await getHomeProjectApi()
    
    if (result.status == 200){
      setProjects(result.data)
    }else{
      setProjects([])
    }
  }

  const handleProjectsPage = ()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      toast.info("login to view projects")
    }
  }
  return (
    <>
      <ToastContainer position="top-center" theme="colored" transition={Flip}/>
      <div style={{width:"100%",height:"85vh"}} className="container-fluid rounded bg-info">
        <Row className='align-items-center p-5'>
            <Col  sm={12} md={6}>
                <h1 style={{fontSize:"80px"}} className='fw-border text-light'><i className="fa-solid fa-list-check me-2"></i>Project-Fair</h1>
                <p className='text-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque iure, mollitia natus tempora enim modi voluptas consequuntur, assumenda accusantium ratione sapiente esse quia similique ad tenetur vero deserunt. Delectus, error!</p>
                {
                  !loggedIn?
                  <Link to={'/login'}><Button className='btn btn-warning'>Start to Explore</Button></Link>:
                  <Link to={'/dashboard'}><Button className='btn btn-warning'>Manage Projects</Button></Link>
                }
            </Col>
            <Col sm={12} md={6} >
                <img src={titleImage} className='my-5' width={"60%"} alt="titleImage" />
            </Col>
        </Row>
      </div>


      {/* Projects */}

      <div className="all-projects mt-5">
        <h1 className='text-center text-primary'>Explore your projects</h1>
        <marquee scrollamount={25}>
            <Row>
              {
                projects?.length>0?projects.map((item,index)=>(
                  <Col key={index} sm={12} md={4} ld={4}>
                    <Projectcard project = {item} />
                  </Col>
                )):<></>
              }
            </Row>
        </marquee>
        <div className="text-center mt-5">
          <button className='btn' style={{textDecoration:"none", color:"blue"}} onClick={handleProjectsPage}>View more projects</button>
        </div>
      </div>
    </>
  )
}

export default Home
