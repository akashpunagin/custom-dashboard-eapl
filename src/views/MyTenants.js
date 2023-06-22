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
import tenantApi from "apiService/tenant/tenantApi";
import profileApi from "apiService/profile/profileApi";

const MyTenants = () => {
  const getMyTenantsApi = useApi(tenantApi.getTenantsByCustomerId);
  const getMyProfileApi = useApi(profileApi.myProfile);

  async function setTenantsState() {
    const result = await getMyProfileApi.request();
    if (result?.status === 200) {
      await getMyTenantsApi.request(result?.data.userId);
    }
  }

  useEffect(() => {
    setTenantsState();
  }, []);

  function getTenantCard(
    index,
    firstName,
    lastName,
    email,
    contactNumber,
    tenantId,
    address
  ) {
    return (
      <Card key={index}>
        <CardHeader>
          <CardTitle tag="h4">
            {`${index + 1}) `}
            {firstName} {lastName}
          </CardTitle>
        </CardHeader>
        <CardBody className="ml-3">
          <Row>
            <Col md="6">
              <p>Email: {email}</p>
            </Col>
            <Col md="6">
              <p>Contact Number: {contactNumber}</p>
            </Col>
            <Col md="6"></Col>
          </Row>
          <p>Tenant Id: {tenantId}</p>
          <p>Address: {address}</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <>
      <div className="content">
        <CardTitle tag="h2">My Tenants</CardTitle>
        {getMyTenantsApi.loading ? "Loading all tenants" : ""}
        {getMyTenantsApi.data &&
          getMyTenantsApi.data.map((tenant, index) => {
            return getTenantCard(
              index,
              tenant.firstName,
              tenant.lastName,
              tenant.email,
              tenant.contactNumber,
              tenant.userId,
              tenant.address
            );
          })}
      </div>
    </>
  );
};

export default MyTenants;
