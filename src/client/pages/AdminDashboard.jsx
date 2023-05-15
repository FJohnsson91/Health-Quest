import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from '../api/axios';
import { Table } from 'react-bootstrap';
import moment from 'moment/moment';

function AdminDashboard() {
  const [dashData, setDashData ] = useState('');

  useEffect(() => {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        axios.get('/adminDashboard', {
          headers: {
            'Authorization': token ? `Bearer ${token}` : ''
          }
        }).then((resp) => {
          // console.log(resp)
          setDashData(resp?.data);
        })
      }
    } catch (error) {
      // console.log(error)
      localStorage.clear()
    }
    
  }, [])

  // console.log(dashData);
  
  

  return (
    <Container>
    <Row>
      <Col>
        <h1 className='brand mt-4'>Admin Dashboard</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card text="light" style={{backgroundColor: "#444343e1", marginBottom: "10px"}} className="mb-3">
          <Card.Body>
            <Card.Title>Total Activities</Card.Title>
            <Card.Text style={{ fontSize: '4rem', fontWeight: 'bold' }}>{dashData?.activityCount}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card bg="success" text="light" className="mb-3">
          <Card.Body>
            <Card.Title>Total Users</Card.Title>
            <Card.Text style={{ fontSize: '4rem', fontWeight: 'bold', color: 'light' }}>{dashData?.userCount}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <h3 className='brand mt-4'>Latest Activities By Our Users</h3>
      </Col>
    </Row>
    <Table responsive>
      <thead>
        <tr className="brand">
          <th>Activity Name</th>
          <th>User Name</th>
          <th>Points Earned</th>
          <th>Date Taken</th>
        </tr>
      </thead>
      <tbody>
        {dashData?.activityTakenData?.map((item) => (
          <tr key={item?._id} className="brand">
            <td style={{color: "white"}}>{item?.activity?.activity}</td>
            <td style={{color: "white"}}>{item?.activityTakenBy?.username}</td>
            <td style={{color: "white"}}>{item?.activity?.points}</td>
            <td style={{color: "white"}}>{moment(item?.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
  );
}

export default AdminDashboard;
