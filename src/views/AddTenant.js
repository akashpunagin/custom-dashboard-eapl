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
import React, { Fragment, useEffect, useRef, useState } from "react";
// react component used to create a calendar with events on it
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";

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
import { faUser } from "@fortawesome/fontawesome-free-regular";
import useApi from "hooks/useApi";
import authApi from "apiService/auth/authApi";

import { showSuccessAlert, showWarningAlert } from "utils/alerts/alerts";

const AddTenant = () => {
  const [alert, setAlert] = React.useState(null);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const postRegisterTenantApi = useApi(authApi.registerAsTenant);
  const postSendConfirmationEmailApi = useApi(authApi.sendConfirmationEmail);

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

  const [state, setState] = React.useState({});

  async function handleAddTenantClick() {
    console.log("Add tenant");
    const email = emailRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const country = countryRef.current.value;
    const state = stateRef.current.value;
    const city = cityRef.current.value;
    const zip = zipRef.current.value;
    const address = addressRef.current.value;
    const contact_number = contactNumberRef.current.value;
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
      contact_number,
      password,
    };

    const result = await postRegisterTenantApi.request(data);
    setIsUserRegistered((prev) => true);

    if (result?.status === 200) {
      const emailConfirmationResult =
        await postSendConfirmationEmailApi.request(result?.data.userId);
      console.log({ emailConfirmationResult });
      if (emailConfirmationResult?.status === 200) {
        showSuccessAlert(
          setAlert,
          "Tenant registered Successfully, confirmation email has been sent"
        );
      }
    }
  }

  return (
    <>
      <div className="content">
        {alert}
        {/* TODO remove if not needed */}
        {/* <Button
          onClick={(e) => {
            e.preventDefault();
            emailRef.current.value = "akash.punagin@gmail.com";
            firstNameRef.current.value = "tenant";
            lastNameRef.current.value = "lastname";
            countryRef.current.value = "India";
            stateRef.current.value = "Karnataka";
            cityRef.current.value = "Bangalore";
            zipRef.current.value = "560064";
            addressRef.current.value = "RWF West Colony, Yelahanka New Town";
            contactNumberRef.current.value = "8042802345";
            passwordRef.current.value = "password";
          }}
        >
          Auto fill
        </Button> */}
        <Card>
          <CardHeader>
            <CardTitle tag="h2">Add Tenant</CardTitle>
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
                  onFocus={(e) => setState({ ...state, firstNameFocus: true })}
                  onBlur={(e) => setState({ ...state, firstNameFocus: false })}
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
                  onFocus={(e) => setState({ ...state, lastNameFocus: true })}
                  onBlur={(e) => setState({ ...state, lastNameFocus: false })}
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
                  onFocus={(e) => setState({ ...state, emailFocus: true })}
                  onBlur={(e) => setState({ ...state, emailFocus: false })}
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
                  onFocus={(e) => setState({ ...state, countryFocus: true })}
                  onBlur={(e) => setState({ ...state, countryFocus: false })}
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
                  onFocus={(e) => setState({ ...state, stateFocus: true })}
                  onBlur={(e) => setState({ ...state, stateFocus: false })}
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
                  onFocus={(e) => setState({ ...state, addressFocus: true })}
                  onBlur={(e) => setState({ ...state, addressFocus: false })}
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
                handleAddTenantClick();
              }}
              size="lg"
            >
              Register
            </Button>
            <h4>
              {postRegisterTenantApi.error
                ? `Tenent Registration error: ${postRegisterTenantApi.error}`
                : ""}
            </h4>
            <h4>
              {isUserRegistered && postSendConfirmationEmailApi.loading
                ? "Sending Confirmation email"
                : ""}
            </h4>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AddTenant;
