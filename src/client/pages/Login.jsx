import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function Login() {

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef();
  const errRef = useRef();
  

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const token = localStorage.getItem("token")
      if (token) {navigate('/')}

      
  useEffect(() => {
    userRef.current.focus();
}, [])

useEffect(() => {
  setErrMsg('');
}, [userName, password])
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/login",
          JSON.stringify({ userName, password }),
          {
              headers: { 'Content-Type': 'application/json' }
          }
      );
      
      const accessToken = response?.data?.token;
      localStorage.setItem("token",accessToken)
      const role = response?.data?.role;
      setAuth({ user:response?.data?.user, role, accessToken });
      setUserName('');
      setPassword('');
      response?.data?.role === "admin"?navigate("/admin", { replace: true }):navigate("/dashboard", { replace: true });
  } catch (err) {
      if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
          setErrMsg(err.response?.data?.message);
      } else if (err.response?.status === 401) {
          setErrMsg(err.response?.data?.message);
      } else {
          setErrMsg('Login Failed');
      }
      errRef.current.focus();
  }
  };

  return (
    <Container fluid className="login-page">
      <Row className="justify-content-center">
        <Col md={4}>
          <Form onSubmit={handleLogin}>
            <h1 className="text-center mb-4 mt-4 brand">Login</h1>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen" } aria-live="assertive">{errMsg}</p>
            <Form.Group controlId="formEmail">
              <Form.Label className='brand'>Username</Form.Label>
              <Form.Control
                type="text"
                ref={userRef}
                placeholder="Username"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label className='brand mt-3'>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <Button className="mt-4 " variant="outline-secondary" type="submit" block>
              <span className="brand">Login</span>
            </Button>
          </Form>
          <p className="brand mt-4">
                Need an Account?<br />
                <span className="line brand">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </Col>
      </Row>
    </Container>
  );
};