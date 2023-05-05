import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

function NavigationMenu() {

  const { auth } = useAuth();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = () => {
    localStorage.clear();
    window.location = "/"
  };
  return (
    <>

      <Navbar style={{ backgroundColor: '#232323', boxShadow: "1px 5px 8px rgb(0 0 0 / 0.2)", }}>
        <Container>
          
            <Button variant="link" onClick={handleShow}>
              <FontAwesomeIcon icon={faListUl} style={{ fontSize: '30px', color: '#2EF273' }} />
            </Button>
            <Link to="/" ><span className="brand">HealthQuest</span></Link>
          
          
          <Navbar.Toggle aria-controls="" />
          <Navbar.Collapse id="">
            <Nav className="me-auto">
            {auth?.user !== undefined ? auth?.role === "admin" ? <Link style={{ color: '#2EF273',marginLeft:"15px"  }} to="/admin">Admin Dashboard</Link> : <Link style={{ color: '#2EF273',marginLeft:"15px"}} to="/dashboard">Dashboard</Link> : null}    
            {auth?.user !== undefined ? auth?.role === "admin" ? <Link style={{ color: '#2EF273',marginLeft:"15px"  }} to="/admin/activity">Activity</Link> : <Link style={{ color: '#2EF273',marginLeft:"15px"}} to="/activity">Activity</Link> : null}
            {auth?.user !== undefined ? auth?.role === "admin" ? <Link style={{ color: '#2EF273',marginLeft:"15px"  }} to="/admin/users">Users</Link> : null : null}
            {auth?.role === "user" ? <Link style={{ color: '#2EF273', marginLeft:"15px" }} >Points : {auth?.user?.points ? auth?.user?.points : 0}</Link> : null}
            </Nav>
            {auth?.user == undefined ? <Nav>
              <Link style={{ color: '#2EF273', marginRight: "10px" }} to="/Login">Login</Link>
              <Link style={{ color: '#2EF273' }} to="/Register">
                Register
              </Link>
            </Nav> : <Nav>
              <span style={{ color: '#2EF273', marginRight: "10px" }}>Welome {auth?.user?.username}!</span>

              
              <Link style={{ color: '#2EF273' }} onClick={handleLogout}>
                Logout
              </Link>
            </Nav>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose} style={{ backgroundColor: '#232323' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: '#2EF273' }}>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {auth?.user == undefined ? <Nav>
              <Link style={{ color: '#2EF273', marginRight: "10px" }} to="/Login">Login</Link>
              <Link style={{ color: '#2EF273' }} to="/Register">
                Register
              </Link>
            </Nav> : <Nav>
              <span style={{ color: '#2EF273', marginRight: "10px" }}>Welome {auth?.user?.username}!</span>

              {auth?.role === "user" ? <Link style={{ color: '#2EF273', marginRight: "10px" }} >Points : {auth?.user?.points ? auth?.user?.points : 0}</Link> : null}
              <Link style={{ color: '#2EF273' }} onClick={handleLogout}>
                Logout
              </Link>
            </Nav>}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavigationMenu;