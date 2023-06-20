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
import React, { useState } from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

const Register = () => {
  const registrationMode = {
    admin: "admin",
    customer: "customer",
    tenant: "tenant",
  };

  const [registrationModeState, setRegistrationModeState] = useState(
    registrationMode.admin
  );

  const [state, setState] = React.useState({});
  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    return function cleanup() {
      document.body.classList.toggle("register-page");
    };
  });

  function getRegistrationModeLabel(registrationModeState) {
    if (registrationModeState === registrationMode.admin) {
      return "as admin";
    }
    if (registrationModeState === registrationMode.customer) {
      return "as customer";
    }
    if (registrationModeState === registrationMode.tenant) {
      return "as tenant";
    }
  }

  return (
    <>
      <div className="content">
        <Container>
          <Row>
            <Col className="ml-auto" md="3">
              <Button
                className="btn-round"
                color="primary"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  setRegistrationModeState((prev) => {
                    console.log({ prev });
                    return registrationMode.admin;
                  });
                }}
                size="lg"
              >
                Register as Admin
              </Button>
              <Button
                className="btn-round"
                color="primary"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  setRegistrationModeState((prev) => registrationMode.customer);
                }}
                size="lg"
              >
                Register as Customer
              </Button>
              <Button
                className="btn-round"
                color="primary"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  setRegistrationModeState((prev) => registrationMode.tenant);
                }}
                size="lg"
              >
                Register as Tenant
              </Button>
            </Col>
            <Col className="mr-auto" md="9">
              <Card className="card-register card-white">
                <CardHeader>
                  {/* <CardImg
                    alt="..."
                    src={require("assets/img/card-primary.png")}
                  /> */}
                  <CardTitle
                    style={{ color: "grey" }}
                    tag="h4"
                    className="pl-4"
                  >
                    Register
                  </CardTitle>
                  <h2 style={{ color: "grey" }} className="pl-4">
                    {getRegistrationModeLabel(registrationModeState)}
                  </h2>
                </CardHeader>
                <CardBody>
                  <Form className="form">
                    <InputGroup
                      className={classnames({
                        "input-group-focus": state.nameFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Full Name"
                        type="text"
                        onFocus={(e) => setState({ ...state, nameFocus: true })}
                        onBlur={(e) => setState({ ...state, nameFocus: false })}
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": state.emailFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="text"
                        onFocus={(e) =>
                          setState({ ...state, emailFocus: true })
                        }
                        onBlur={(e) =>
                          setState({ ...state, emailFocus: false })
                        }
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": state.passFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="text"
                        onFocus={(e) => setState({ ...state, passFocus: true })}
                        onBlur={(e) => setState({ ...state, passFocus: false })}
                      />
                    </InputGroup>
                    <FormGroup check className="text-left">
                      <Label check>
                        <Input type="checkbox" />
                        <span className="form-check-sign" />I agree to the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          terms and conditions
                        </a>
                        .
                      </Label>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-round"
                    color="primary"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Register;
