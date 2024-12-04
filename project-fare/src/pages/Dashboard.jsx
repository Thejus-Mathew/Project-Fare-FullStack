import React, { useState } from 'react'
import Header from '../components/Header'
import Myprojects from '../components/Myprojects'
import Profile from '../components/Profile'
import { Col, Row } from 'react-bootstrap'

function Dashboard() {
  const[s,setS]=useState("")

  return (
    <>
      <Header insideDashboard/>
      <Row className=' m-0 w-100'>
        <Col className='' sm={12} md={8}>
          <h2>Welcome <span className='text-warning fw-bolder'>{sessionStorage.getItem("username") || "user"}</span></h2>
          <Myprojects/>
        </Col>
        <Col className='' sm={12} md ={4}>
          <Profile/>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard
