import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from '../api/axios.jsx';
import { Table } from 'react-bootstrap';


function Dashboard() {
  const [dashData, setDashData ] = useState('');
  useEffect(() => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          axios.get('/stats', {
            headers: {
              'Authorization': token ? `Bearer ${token}` : ''
            }
          }).then((resp) => {
            console.log(resp)
            setDashData(resp?.data);
          })
        }
      } catch (error) {
        console.log(error)
        localStorage.clear()
      }
  }, [])

  return (
    <Container fluid className='brand mt-4'>
    <Row>
      <Col md={8} lg={6}>
        <Card bg="dark" text="light">
          <Card.Body>
            <Card.Title>Total Activity Taken</Card.Title>
            <Card.Text style={{ fontSize: "5rem" }}>{dashData?.activitiesTaken}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} lg={6}>
        <Card bg="success" text="light">
          <Card.Body>
            <Card.Title>Total Points Earned</Card.Title>
            <Card.Text style={{ fontSize: "5rem" }}>{dashData?.totalPoints}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row className="mt-4">
      <Col>
      <Row>
      <Col>
        <h3 className='brand mt-4'>My Activity History</h3>
      </Col>
    </Row>
      <Table responsive>
      <thead>
        <tr className='brand'>
          <th>Activity Name</th>
          <th>Points Earned</th>
          <th>Date Taken</th>
        </tr>
      </thead>
      <tbody>
        {dashData?.activityTaken?.map((activity,i) => (
          <tr key={activity._id} className='brand'>
            <td>{activity.activity.activity}</td>
            <td>{activity.activity.points}</td>
            <td>{new Date(activity.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3" className='brand'>Total Points Earned: {dashData?.totalPoints}</td>
        </tr>
      </tfoot>
    </Table>
      </Col>
    </Row>
  </Container>
);
}
export default Dashboard;