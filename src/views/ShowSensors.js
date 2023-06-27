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
import { showWarningAlert } from "utils/alerts/alerts";
import { showSuccessAlert } from "utils/alerts/alerts";
import customerApi from "apiService/customer/customerApi";
import sensorApi from "apiService/sensor/sensorApi";

const ShowSensors = () => {
  const [alert, setAlert] = React.useState(null);

  const getAllDeviceApi = useApi(deviceApi.getAllDevices);
  const getSensorsOfDeviceApi = useApi(sensorApi.getSensorsOfDevice);

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);

  const [sensors, setSensors] = useState(null);

  function getSensorCard(
    index,
    sensorName,
    sensorId,
    sensorReportGroup,
    sensorUOM
  ) {
    return (
      <Card key={index}>
        <CardHeader>
          <CardTitle tag="h4">
            {`${index + 1})`} {sensorName}
          </CardTitle>
        </CardHeader>
        <CardBody className="ml-3">
          <Row>
            <Col md="6">
              <p>Sensor Id: {sensorId}</p>
            </Col>
            <Col md="6"></Col>
          </Row>
          <p>Sensor Report Group: {sensorReportGroup}</p>
          <p>Sensor Unit Of Measurement: {sensorUOM}</p>
        </CardBody>
      </Card>
    );
  }

  async function setAllDeviceState() {
    const result = await getAllDeviceApi.request();
    if (result?.status !== 200) {
      showWarningAlert(setAlert, `Error while fetching all devices`);
      return;
    }
    const deviceData = result.data;
    const dropdownDevices = deviceData.map((device) => {
      return {
        value: device,
        label: device.device_id,
      };
    });
    setDevices((prev) => dropdownDevices);
  }

  async function handleGetSensors() {
    if (selectedDevice === null) {
      showWarningAlert(setAlert, "Select a device to continue");
      return;
    }
    const result = await getSensorsOfDeviceApi.request(
      selectedDevice.value.device_id
    );
    if (result?.status !== 200) {
      showWarningAlert(setAlert, "Error while getting sensors by device id");
      return;
    }
    console.log("SEE DATA:", result.data);
    setSensors((prev) => result.data);
  }

  useEffect(() => {
    setAllDeviceState();
  }, []);

  return (
    <>
      <div className="content">
        {alert}
        <CardTitle tag="h2">Show Sensors of Device</CardTitle>
        <Row>
          <Col md="8">
            <Select
              className="react-select info"
              classNamePrefix="react-select"
              name="singleSelect"
              value={selectedDevice}
              onChange={(value) => setSelectedDevice(value)}
              options={devices}
              placeholder="Select Device"
            />
          </Col>
          <Col md="4">
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleGetSensors();
              }}
              className="btn-fill"
              color="primary"
            >
              Get Sensors
            </Button>
          </Col>
        </Row>
        <div className="mt-4">
          {getSensorsOfDeviceApi.loading ? "Loading sensors" : ""}
          {sensors &&
            sensors.map((sensor, index) => {
              return getSensorCard(
                index,
                sensor.sensor_name,
                sensor.sensor_id,
                sensor.sensor_report_group,
                sensor.sensor_uom
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ShowSensors;
