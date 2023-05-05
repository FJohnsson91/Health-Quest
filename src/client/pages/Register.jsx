import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link,useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Registration = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const token = localStorage.getItem("token")
  if (token) {navigate('/')}
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user])
  
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])

  const handleRegister = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post("/register",
        JSON.stringify({ userName: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      setSuccess(true);
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed')
      }
      errRef.current.focus();
    }
  }

  return (
    <>
      {success ? (
        <Container fluid className="register-page brand mt-4">
          <Row className="justify-content-center">
          <Col md={4}>
          <h1 className="brand">Success!</h1>
          <p>
          <Link to="/Login">Sign In</Link>
          </p>
          </Col>
          </Row>
          </Container>
      ) : (
        <Container fluid className="register-page">
          <Row className="justify-content-center">
            <Col md={4}>
              <Form onSubmit={handleRegister}>
                <h1 className="text-center mb-4 mt-4 brand">Register</h1>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <Form.Group controlId="formEmail">
                  <Form.Label className='brand'>User Name
                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter User Name"
                    ref={userRef}
                    value={user}
                    onChange={(event) => setUser(event.target.value)}
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    required
                  />
                  <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label className='brand mt-3'>Password
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={pwd}
                    onChange={(event) => setPwd(event.target.value)}
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    required
                  />
                  <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label className='brand mt-3'>ReType Password
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="re-enter Password"
                    value={matchPwd}
                    onChange={(event) => setMatchPwd(event.target.value)}
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    required
                  />
                  <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                  </p>
                </Form.Group>
                <Button disabled={!validName || !validPwd || !validMatch ? true : false} className="mt-4 " variant="outline-secondary" type="submit" block>
                  <span className="brand">Register</span>
                </Button>
              </Form>
              <p className="brand">
                Already registered?<br />
                <span className="line">
                  <Link to="/Login">Sign In</Link>
                </span>
              </p>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Registration;