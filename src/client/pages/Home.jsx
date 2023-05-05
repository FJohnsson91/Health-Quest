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
            <h1>Welcome to Health Quest</h1>
            <p className="lead">Join us on a journey towards a healthier life</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2>About Us</h2>
            <p>
              Health Quest is a community of health enthusiasts who are dedicated to achieve their
              health goals. We offer a variety of Quests.
            </p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2>Contact Us</h2>
            <p>
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