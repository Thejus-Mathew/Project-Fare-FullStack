import React, { useContext } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { tokenAuthContext } from "../ContextApi/Tokenauth";

function Header({insideDashboard}) {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/')
    setIsAuthorized(false)
  }
  return (
    <>
      <Navbar className="bg-info">
        <Container>
          <Navbar.Brand>
            <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
              <i className="fa-solid fa-list-check mx-3"></i>Project Fair
            </Link>
          </Navbar.Brand>
          {insideDashboard?<><Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button className="btn btn-secondary" onClick={handleLogout}>Logout</Button>
            </Navbar.Text>
          </Navbar.Collapse></>:<></>}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
