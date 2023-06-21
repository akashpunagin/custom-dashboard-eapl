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
import React, { useRef, useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/fontawesome-free-regular";
import useApi from "hooks/useApi";
import authApi from "apiService/auth/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const postRegisterAsAdminApi = useApi(authApi.registerAsAdmin);
  const postRegisterAsCustomerApi = useApi(authApi.registerAsCustomer);
  const postSendConfirmationEmailApi = useApi(authApi.sendConfirmationEmail);

  const registrationMode = {
    admin: "admin",
    customer: "customer",
  };

  const [registrationModeState, setRegistrationModeState] = useState(
    registrationMode.admin
  );

  const [state, setState] = React.useState({});
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const countryRef = useRef();
  const stateRef = useRef();
  const cityRef = useRef();
  const zipRef = useRef();
  const addressRef = useRef();
  const contactNumberRef = useRef();
  const passwordRef = useRef();

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
  }

  function getRegisterErrorMessage() {
    if (
      registrationModeState === registrationMode.admin &&
      postRegisterAsAdminApi.error
    ) {
      return `Admin Register Error: ${postRegisterAsAdminApi.error}`;
    } else if (
      registrationModeState === registrationMode.customer &&
      postRegisterAsCustomerApi.error
    ) {
      return `Customer Register Error: ${postRegisterAsCustomerApi.error}`;
    }
  }

  async function handleSendConfirmationEmail(userId) {
    const emailConfirmationResult = await postSendConfirmationEmailApi.request(
      userId
    );
    if (emailConfirmationResult.status === 200) {
      alert("Confirmation email sent");
    } else {
      alert("Error while sending confirmation email");
    }
  }

  async function handleRegisterClick() {
    const email = emailRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const country = countryRef.current.value;
    const state = stateRef.current.value;
    const city = cityRef.current.value;
    const zip = zipRef.current.value;
    const address = addressRef.current.value;
    const contactNumber = contactNumberRef.current.value;
    const password = passwordRef.current.value;

    const data = {
      email,
      firstName,
      lastName,
      country,
      state,
      city,
      zip,
      address,
      contactNumber,
      password,
    };

    if (registrationModeState === registrationMode.admin) {
      const result = await postRegisterAsAdminApi.request(data);
      if (result?.status === 200) {
        setIsUserRegistered((prev) => true);
        await handleSendConfirmationEmail(result?.data.userId);
        navigate("/auth/login");
      }
    }
    if (registrationModeState === registrationMode.customer) {
      const result = await postRegisterAsCustomerApi.request(data);
      if (result?.status === 200) {
        setIsUserRegistered((prev) => true);
        await handleSendConfirmationEmail(result?.data.userId);
        navigate("/auth/login");
      }
    }
  }

  return (
    <>
      <div className="content">
        <Container>
          <Row>
            <Col className="ml-auto" md="3">
              {/* todo remove button start*/}
              <Button
                className="btn-round"
                color="primary"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  emailRef.current.value = "akash.punagin@gmail.com";
                  firstNameRef.current.value = "admin";
                  lastNameRef.current.value = "admin";
                  countryRef.current.value = "India";
                  stateRef.current.value = "Karnataka";
                  cityRef.current.value = "Bangalore";
                  zipRef.current.value = "560064";
                  addressRef.current.value =
                    "RWF West Colony, Yelahanka New Town";
                  contactNumberRef.current.value = "8042802345";
                  passwordRef.current.value = "password";
                }}
                size="lg"
              >
                Auto fill
              </Button>
              {/* todo remove button end*/}

              <Button
                className="btn-round"
                color="primary"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  setRegistrationModeState((prev) => registrationMode.admin);
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
                        "input-group-focus": state.firstNameFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faUser} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        innerRef={firstNameRef}
                        placeholder="First Name"
                        type="text"
                        onFocus={(e) =>
                          setState({ ...state, firstNameFocus: true })
                        }
                        onBlur={(e) =>
                          setState({ ...state, firstNameFocus: false })
                        }
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": state.lastNameFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faUser} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        innerRef={lastNameRef}
                        placeholder="Last Name"
                        type="text"
                        onFocus={(e) =>
                          setState({ ...state, lastNameFocus: true })
                        }
                        onBlur={(e) =>
                          setState({ ...state, lastNameFocus: false })
                        }
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": state.emailFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faUser} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        innerRef={emailRef}
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
                        "input-group-focus": state.countryFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faUser} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        innerRef={countryRef}
                        placeholder="Country"
                        type="text"
                        onFocus={(e) =>
                          setState({ ...state, countryFocus: true })
                        }
                        onBlur={(e) =>
                          setState({ ...state, countryFocus: false })
                        }
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": state.stateFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faUser} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        innerRef={stateRef}
                        placeholder="State"
                        type="text"
                        onFocus={(e) =>
                          setState({ ...state, stateFocus: true })
                        }
                        onBlur={(e) =>
                          setState({ ...state, stateFocus: false })
                        }
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": state.cityFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faUser} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        innerRef={cityRef}
                        placeholder="City"
                        type="text"
                        onFocus={(e) => setState({ ...state, cityFocus: true })}
                        onBlur={(e) => setState({ ...state, cityFocus: false })}
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": state.addressFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faUser} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        innerRef={addressRef}
                        placeholder="Address"
                        type="text"
                        onFocus={(e) =>
                          setState({ ...state, addressFocus: true })
                        }
                        onBlur={(e) =>
                          setState({ ...state, addressFocus: false })
                        }
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": state.zipFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faUser} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        innerRef={zipRef}
                        placeholder="Zip"
                        type="text"
                        onFocus={(e) => setState({ ...state, zipFocus: true })}
                        onBlur={(e) => setState({ ...state, zipFocus: false })}
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": state.contactNumberFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faUser} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        innerRef={contactNumberRef}
                        placeholder="Contact number"
                        type="text"
                        onFocus={(e) =>
                          setState({ ...state, contactNumberFocus: true })
                        }
                        onBlur={(e) =>
                          setState({ ...state, contactNumberFocus: false })
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
                          <FontAwesomeIcon icon={faUser} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        innerRef={passwordRef}
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleRegisterClick();
                    }}
                    size="lg"
                  >
                    Register
                  </Button>
                  <h4 style={{ color: "black" }}>
                    {getRegisterErrorMessage()}
                  </h4>
                  <h4 style={{ color: "black" }}>
                    {isUserRegistered && postSendConfirmationEmailApi.loading
                      ? "Sending Confirmation email"
                      : ""}
                  </h4>
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
