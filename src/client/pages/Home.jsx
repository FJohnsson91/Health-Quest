import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();


  // console.log(auth)
    return (
        <div style={{ color: '#2EF273' }}>
      <Container>
        <Row className="mt-5">
          <Col>
            <h1>Welcome to HealthQuest</h1>
            <p className="lead" style={{color: "white"}}>Join us on a journey towards a healthier life</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2>About Us</h2>
            <p style={{color: "white"}}>
            <span style={{color: "#2EF273",fontWeight: "bold"}}>David Carces:</span> Frontend, Information and Communication
              <br /><br />
              <span style={{color: "#2EF273",fontWeight: "bold"}}>Ludvig Jenisch:</span> Frontend
              <br /><br />
              <span style={{color: "#2EF273",fontWeight: "bold"}}>Fredrik Johnsson:</span> Backend
              <br /><br />
              <span style={{color: "#2EF273",fontWeight: "bold"}}>Emil Vernersson Jacobsson:</span> Backend
              <br /><br />
              <span style={{color: "#2EF273",fontWeight: "bold"}}>Alfred Stührenberg:</span> Frontend
            </p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2>Contact Us</h2>
            <p style={{color: "white"}}>
              If you have any questions or would like to learn more about our services, please feel free to
              contact us at info@healthquest.com.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
    )
}

export default Home;