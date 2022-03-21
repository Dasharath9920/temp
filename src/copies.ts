import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment-timezone";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from "../../atoms/Button/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import axios from "../../../services/axios";
import { loginUser } from "../../../services/auth";
import { setAuthUser } from "../../../store/actions/User";
import { loginSuccess } from "../../../store/actions/Auth";
import "./style.css";

const HeaderCol = styled(Col)`
  background: #123fbc;
  height: 100vh;
  padding-left: 80px;
  min-width: 55%;
  color: #ffffff;
  > h1,
  p {
    width: 600px;
  }
  > h1 {
    margin-top: 80px;
    font-size: 75px;
    font-weight: 700;
  }
  > p {
    margin-top: 160px;
    text-transform: uppercase;
    font-size: 35px;
    font-weight: 600;
  }

  @media (max-width: 1100px) {
    min-width: 50%;
    padding-left: 50px;
    > h1 {
      font-size: 55px;
      // text-align: center;
    }
  }

  @media (max-width: 850px) {
    min-width: 100%;
    height: 180px;
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > h1 {
      margin: 0px;
      font-size: 32px;
    }

    > p {
      margin: 0px;
      display: flex;
      font-size: 25px;
      width: 100%;
      justify-content: space-evenly;
    }
  }

  @media (max-width: 600px) {
    padding: 40px 30px;

    > h1 {
      font-size: 30px;
    }

    > p {
      font-size: 20px;
    }
  }
`;

const FormCol = styled(Col)`
  min-width: 45%;
  background: #ffffff;
  max-height: 100vh;
  display: flex;
  justify-content: center;
`;

const FormColInner = styled.div`
  min-width: 90%;
  padding: 70px 0;
`;
const LogoHeader = styled.div`
  display: flex;
  margin: -10px 0px;

  .logo-img {
    height: 40px;
    width: 40px;
    margin-right: 17px;
    font-weight: 500;
  }
  .logo-text {
    font-size: 27px;
    color: #3d3d3d;
    margin: 0;

    > span {
      color: #133fbc;
    }
  }

  @media (max-width: 850px) {
    margin-top: -40px;
    .logo-text {
      font-size: 30px;
    }
  }
`;
const FormHeader = styled.div`
  margin-top: 50px;
  > h2 {
    font-weight: 700;
    font-size: 60px;
    color: #3d3d3d;
  }
  > p {
    margin-top: 20px;
    margin-bottom: 50px;
  }

  @media (max-width: 1100px) {
    > h2 {
      font-size: 50px;
    }

    > p {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 850px) {
    margin-top: 40px;

    > h2 {
      font-size: 40px;
    }

    > p {
      margin: 15px 0px 30px 0px;
    }
  }
`;
const FormLabel = styled(Form.Label)`
  font-weight: 600;
  margin-bottom: 15px;
`;
const FormControl = styled(Form.Control)`
  border: 0.6px solid #787878;
  box-sizing: border-box;
  border-radius: 4px;
  height: 56px;
  background: #ffffff;

  @media (max-width: 850px) {
    max-height: 50px;
    margin-bottom: -10px;
  }
`;

export const LoginPage = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const [hidden, setHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    setErrorMessage("");
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleToggle = () => {
    setHidden(!hidden);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, access_token, refresh_token } = await loginUser(state);
      user?.user_config?.timezone
        ? moment.tz.setDefault(user?.user_config?.timezone)
        : moment.tz.setDefault(moment.tz.guess());
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      dispatch(setAuthUser(user));
      dispatch(loginSuccess(access_token, refresh_token));
      setErrorMessage("");
      setState({ email: "", password: "" });
    } catch (e) {
      setErrorMessage(e?.response?.data ? e?.response?.data : "Invalid User!");
    }
  };

  return (
    <Container fluid>
      <Row>
        <HeaderCol>
          <h1>
            Providing
            <br />
            Direction
            <br />
            To
            <br />
            Interviews.
          </h1>
          <p>
            Hire Right.
            <br />
            Hire Fast.
          </p>
        </HeaderCol>

        <FormCol style={{ backgroundColor: "#f8f8f8" }}>
          <FormColInner>
            <LogoHeader>
              <img
                className="logo-img"
                src="/images/interviewvector.png"
                alt="InterviewVector"
              />
              <p style={{ marginTop: "8px" }} className="logo-text">
                Interview<span>Vector</span>
              </p>
            </LogoHeader>

            <FormHeader>
              <h2>Log In.</h2>
              <p>Log in with the credentials you set while registering.</p>
            </FormHeader>

            <Form onSubmit={handleSubmit} style={{ maxWidth: "80%" }}>
              <p
                style={{ marginBottom: "20px", color: "red", fontSize: "12px" }}
              >
                {errorMessage}
              </p>

              <Form.Group>
                <FormLabel>Email ID</FormLabel>
                <div style={{ width: "125%" }}>
                  <FormControl
                    style={{ marginTop: "-5px" }}
                    className="custom-login-input"
                    name="email"
                    type="email"
                    placeholder=""
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
              <Form.Group style={{ marginTop: "30px" }}>
                <FormLabel>Password</FormLabel>
                <div style={{ width: "125%" }}>
                  <FormControl
                    style={{
                      marginTop: "-5px",
                      height: "48px",
                      border: "1px solid #a6a6a6",
                      fontSize: "14px",
                      backgroundColor: "#f8f8f8",
                    }}
                    name="password"
                    type={hidden ? "password" : "text"}
                    placeholder=""
                    onChange={handleChange}
                    className="col-sm-12"
                  />
                </div>
              </Form.Group>
              <Form.Group style={{ marginTop: "25px" }}>
                <Form.Check
                  className="checkbox"
                  type="checkbox"
                  label="Show Password"
                  onChange={handleToggle}
                />
              </Form.Group>
              <Form.Group style={{ marginTop: "40px" }}>
                <Button
                  className="login-button"
                  type="submit"
                  variant="primary"
                  fullWidth
                >
                  Log In
                </Button>
              </Form.Group>
            </Form>
            <Box>
              <Link to="/forgot-password">
                <div className="forgot-password">Forgot password?</div>
              </Link>
            </Box>
          </FormColInner>
        </FormCol>
      </Row>
    </Container>
  );
};

export default LoginPage;
