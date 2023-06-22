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
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-regular";
import useApi from "hooks/useApi";
import authApi from "apiService/auth/authApi";

import { showSuccessAlert, showWarningAlert } from "utils/alerts/alerts";
import tenantApi from "apiService/tenant/tenantApi";
import profileApi from "apiService/profile/profileApi";
import deviceApi from "apiService/device/deviceApi";
import customerApi from "apiService/customer/customerApi";

const AssignDevices = () => {
  const [alert, setAlert] = React.useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [devices, setDevices] = useState([]);
  const getMyTenantsApi = useApi(tenantApi.getTenantsByCustomerId);
  const getMyDevicesApi = useApi(deviceApi.getMyDevices);
  const getMyProfileApi = useApi(profileApi.myProfile);
  const postAssignDeviceToTenantApi = useApi(customerApi.assignDeviceToTenant);

  async function setTenantsState() {
    const profileResult = await getMyProfileApi.request();
    if (profileResult?.status !== 200) {
      return;
    }

    const result = await getMyTenantsApi.request(profileResult.data.userId);
    if (result?.status !== 200) {
      showWarningAlert(
        setAlert,
        `Error while fetching tenants: ${getMyTenantsApi.error}`
      );
      return;
    }
    const dropdownTenants = result?.data?.map((tenant) => {
      return {
        value: tenant.userId,
        label: `${tenant.firstName} ${tenant.lastName}: ${tenant.email}`,
      };
    });
    setTenants((prev) => dropdownTenants);
  }

  async function setDevicesState() {
    const result = await getMyDevicesApi.request();
    const dropdownDevices = result?.data?.map((device) => {
      return {
        value: device.device_id,
        label: `${device.device_id}`,
      };
    });
    setDevices((prev) => dropdownDevices);
  }

  useEffect(() => {
    setTenantsState();
    setDevicesState();
  }, []);

  async function handleAssignDeviceClick() {
    if (selectedDevice === null) {
      showWarningAlert(setAlert, "Select Device to continue");
      return;
    }
    if (selectedTenant === null) {
      showWarningAlert(setAlert, "Select Tenant to continue");
    }
    console.log({ selectedDevice, selectedTenant });
    const result = await postAssignDeviceToTenantApi.request(
      selectedDevice.value,
      selectedTenant.value
    );
    if (result?.status === 200) {
      showSuccessAlert(setAlert, "Device registered to tenant");
    } else {
      showWarningAlert(setAlert, "Error while assigning device");
    }
  }

  return (
    <>
      <div className="content">
        {alert}

        <Card>
          <CardHeader>
            <CardTitle tag="h2">Assign Device to Tenants</CardTitle>
          </CardHeader>
          <CardBody>
            <Form className="form">
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
              <FormGroup>
                <Select
                  className="react-select info"
                  classNamePrefix="react-select"
                  name="singleSelect"
                  value={selectedDevice}
                  onChange={(value) => setSelectedDevice(value)}
                  options={devices}
                  placeholder="Select Device"
                />
              </FormGroup>
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
                handleAssignDeviceClick();
              }}
              size="lg"
            >
              Register
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AssignDevices;
