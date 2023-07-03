/*!

=========================================================
* Black Dashboard PRO React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useRef } from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

import authApi from "apiService/auth/authApi";
import useApi from "hooks/useApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = React.useState({});
  const navigate = useNavigate();

  const postLoginApi = useApi(authApi.login);
  const getMyRoleApi = useApi(authApi.myRole);
  const emailRef = useRef();
  const passwordRef = useRef();

  React.useEffect(() => {
    document.body.classList.toggle("login-page");
    return function cleanup() {
      document.body.classList.toggle("login-page");
    };
  });

  async function handleGetStartedClick() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email === "") {
      alert("Not a valid email");
      return;
    }
    if (password === "") {
      alert("Not a valid password");
      return;
    }

    const result = await postLoginApi.request(email, password);
    if (result?.status === 200) {
      const roleResult = await getMyRoleApi.request();
      if (roleResult?.data.role === "ADMIN") {
        navigate("/admin");
      } else if (roleResult?.data.role === "CUSTOMER") {
        navigate("/customer");
      } else if (roleResult?.data.role === "TENANT") {
        navigate("/tenant");
      } else {
        alert("LAYOUT NOT IMPLEMENTED");
        navigate("/auth");
      }
    }
  }

  return (
    <>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="12" md="12">
            <Form className="form">
              <Card className="card-login card-white">
                <CardHeader>
                  <img alt="..." src={require("assets/img/card-primary.png")} />
                  <CardTitle tag="h1" className="ml-4 mt-3">
                    Log in
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": state.emailFocus,
                    })}
                  >
                    {/* <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-email-85" />
                      </InputGroupText>
                    </InputGroupAddon> */}
                    <Input
                      style={{
                        color: "black",
                        background: "white",
                        border: "2px grey solid",
                      }}
                      innerRef={emailRef}
                      placeholder="Email"
                      type="text"
                      onFocus={(e) => setState({ ...state, emailFocus: true })}
                      onBlur={(e) => setState({ ...state, emailFocus: false })}
                    />
                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": state.passFocus,
                    })}
                  >
                    {/* <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-lock-circle" />
                      </InputGroupText>
                    </InputGroupAddon> */}
                    <Input
                      style={{
                        color: "black",
                        background: "white",
                        border: "2px grey solid",
                      }}
                      innerRef={passwordRef}
                      placeholder="Password"
                      type="text"
                      onFocus={(e) => setState({ ...state, passFocus: true })}
                      onBlur={(e) => setState({ ...state, passFocus: false })}
                    />
                  </InputGroup>
                  <h4 style={{ color: "black" }}>
                    {postLoginApi.error ? `Error: ${postLoginApi.error}` : ""}
                  </h4>
                </CardBody>
                <CardFooter>
                  <Button
                    block
                    className="mb-3"
                    color="primary"
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      handleGetStartedClick();
                    }}
                    size="lg"
                  >
                    Get Started
                  </Button>
                  <div className="pull-left">
                    <h6>
                      <a
                        className="link footer-link"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Create Account
                      </a>
                    </h6>
                  </div>
                  <div className="pull-right">
                    <h6>
                      <a
                        className="link footer-link"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Need Help?
                      </a>
                    </h6>
                  </div>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default Login;
