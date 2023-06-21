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
import React, { useEffect, useRef, useState } from "react";
// react component used to create a calendar with events on it
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import ReactBSAlert from "react-bootstrap-sweetalert";

import Select from "react-select";
import tenantApi from "apiService/tenant/tenantApi";
import useApi from "hooks/useApi";
import deviceApi from "apiService/device/deviceApi";

const AddDevice = () => {
  const [alert, setAlert] = React.useState(null);

  const [selectedTenant, setSelectedTenant] = useState(null);
  const [tenants, setTenants] = useState([]);
  const getTenantsApi = useApi(tenantApi.getTenants);
  const postAddDeviceApi = useApi(deviceApi.addDevice);

  const deviceIdRef = useRef();
  const clientTopicRef = useRef();
  const varientRef = useRef();
  const hw_verRef = useRef();
  const fw_verRef = useRef();
  const o_logoRef = useRef();
  const o_prod_nameRef = useRef();
  const o_prod_verRef = useRef();
  const u_dev_nameRef = useRef();
  const u_comp_nameRef = useRef();
  const u_tz_diffRef = useRef();
  const u_latRef = useRef();
  const u_longRef = useRef();
  const u_conn_ssidRef = useRef();

  const hideAlert = () => {
    setAlert(null);
  };

  const showSuccessDeviceRegistrationAlert = () => {
    setAlert(
      <ReactBSAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Success"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
        btnSize=""
      >
        Device Registered successfully
      </ReactBSAlert>
    );
  };

  const showWarningDeviceRegistrationAlert = (label) => {
    setAlert(
      <ReactBSAlert
        error
        style={{ display: "block", marginTop: "-100px" }}
        title="Warning"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
        btnSize=""
      >
        {label}
      </ReactBSAlert>
    );
  };

  function setDefaultValues() {
    varientRef.current.value = "1";
    hw_verRef.current.value = "1";
    fw_verRef.current.value = "1";
    o_logoRef.current.value = "1";
    o_prod_nameRef.current.value = "1";
    o_prod_verRef.current.value = "1";
    u_dev_nameRef.current.value = "1";
    u_comp_nameRef.current.value = "1";
    u_tz_diffRef.current.value = "1";
    u_latRef.current.value = "1";
    u_longRef.current.value = "1";
  }

  async function setTenantsState() {
    const result = await getTenantsApi.request();
    const dropdownTenants = result.data.map((tenant) => {
      return {
        value: tenant.userId,
        label: `${tenant.firstName} ${tenant.lastName}: ${tenant.email}`,
      };
    });
    setTenants((prev) => dropdownTenants);
  }

  useEffect(() => {
    setDefaultValues();
    setTenantsState();
  }, []);

  function getNumberFormField(label, ref) {
    return (
      <Row>
        <Label md="3">{label}</Label>
        <FormGroup>
          <Input innerRef={ref} type="number" />
        </FormGroup>
      </Row>
    );
  }

  async function handleAddDevice() {
    console.log("ADD DEV");

    if (selectedTenant === null) {
      showWarningDeviceRegistrationAlert("Select Tenant");
      return;
    }

    const device_id = deviceIdRef.current.value;
    const client_topic = clientTopicRef.current.value;
    const variant = varientRef.current.value;
    const hw_ver = hw_verRef.current.value;
    const fw_ver = fw_verRef.current.value;
    const o_logo = o_logoRef.current.value;
    const o_prod_name = o_prod_nameRef.current.value;
    const o_prod_ver = o_prod_verRef.current.value;
    const u_dev_name = u_dev_nameRef.current.value;
    const u_comp_name = u_comp_nameRef.current.value;
    const u_tz_diff = u_tz_diffRef.current.value;
    const u_lat = u_latRef.current.value;
    const u_long = u_longRef.current.value;
    const u_conn_ssid = u_conn_ssidRef.current.value;
    const user_id = selectedTenant.value;

    const data = {
      user_id,
      device_id,
      client_topic,
      variant,
      hw_ver,
      fw_ver,
      o_logo,
      o_prod_name,
      o_prod_ver,
      u_dev_name,
      u_comp_name,
      u_tz_diff,
      u_lat,
      u_long,
      u_conn_ssid,
    };

    console.log(data);

    await postAddDeviceApi.request(data);
    console.log({ postAddDeviceApi });
    if (postAddDeviceApi.status === 200) {
      showSuccessDeviceRegistrationAlert();
    } else {
      showWarningDeviceRegistrationAlert(postAddDeviceApi.error);
    }
  }

  return (
    <>
      <div className="content">
        {alert}
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Add Device Form</CardTitle>
          </CardHeader>
          <CardBody>
            <Form className="form-horizontal">
              <Row>
                <Label md="3">Device Id</Label>
                <Col md="9">
                  <FormGroup>
                    <Input innerRef={deviceIdRef} type="text" />
                  </FormGroup>
                </Col>
              </Row>
              {tenants.length !== 0 && (
                <Row>
                  <Label md="3">Select Tenant</Label>
                  <Col md="9">
                    <FormGroup>
                      <Select
                        className="react-select info"
                        classNamePrefix="react-select"
                        name="singleSelect"
                        value={selectedTenant}
                        onChange={(value) => setSelectedTenant(value)}
                        options={tenants}
                        placeholder="Select Tenant"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              )}
              <Row>
                <Label md="3">Cilent Topic</Label>
                <Col md="9">
                  <FormGroup>
                    <Input innerRef={clientTopicRef} type="text" />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="align-items-center mt-4">
                <Col>{getNumberFormField("Varient", varientRef)}</Col>
                <Col>{getNumberFormField("hw_ver", hw_verRef)}</Col>
              </Row>
              <Row className="align-items-center">
                <Col>{getNumberFormField("fw_ver", fw_verRef)}</Col>
                <Col>{getNumberFormField("o_logo", o_logoRef)}</Col>
              </Row>
              <Row className="align-items-center">
                <Col>{getNumberFormField("o_prod_name", o_prod_nameRef)}</Col>
                <Col>{getNumberFormField("o_prod_ver", o_prod_verRef)}</Col>
              </Row>
              <Row className="align-items-center">
                <Col>{getNumberFormField("u_dev_name", u_dev_nameRef)}</Col>
                <Col>{getNumberFormField("u_comp_name", u_comp_nameRef)}</Col>
              </Row>
              <Row className="align-items-center">
                <Col>{getNumberFormField("u_tz_diff", u_tz_diffRef)}</Col>
                <Col>{getNumberFormField("u_lat", u_latRef)}</Col>
              </Row>
              <Row className="align-items-center">
                <Col>{getNumberFormField("u_long", u_longRef)}</Col>
                <Col>{getNumberFormField("u_conn_ssid", u_conn_ssidRef)}</Col>
              </Row>
            </Form>
          </CardBody>
          <CardFooter>
            <Form className="form-horizontal">
              <Row>
                <Label md="3" />
                <Col md="9">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddDevice();
                    }}
                    className="btn-fill"
                    color="primary"
                  >
                    Add Device
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AddDevice;
