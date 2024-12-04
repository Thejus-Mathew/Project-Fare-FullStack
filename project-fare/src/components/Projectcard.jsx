import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
// import projectImage from '../assets/images/image2.webp'
import { serverURL } from '../services/serverURL';


function Projectcard({project}) {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  return (
    <>
      <Card style={{ width: '18rem' }} className='mt-3'>
        <Card.Img variant="top" src={`${serverURL}/uploads/${project?.projectImage}`} onClick={handleShow} />
        <Card.Body>
          <Card.Title>{project?.title}</Card.Title>
        </Card.Body>
      </Card>


      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img src={`${serverURL}/uploads/${project?.projectImage}`} width={"100%"} alt="" />
            </Col>
            <Col md={6}>
              <h2 className='text-success'>{project?.title}</h2>
              <p><span><strong>Project Overview:</strong></span>{project?.overview}</p>
              <p className='text-warning'>Languages Used: {project?.languages}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className="mt-2">
            <a href={project?.github} target='_blank' className='btn me-3'><i className="fa-brands fa-github fa-2xl"></i></a>
            <a href={project?.website} target='_blank' className='btn me-3'><i className="fa-solid fa-link fa-2xl"></i></a>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Projectcard
