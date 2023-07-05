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

function cvtObjValuesToString(o) {
  Object.keys(o).forEach((k) => {
    if (typeof o[k] === "object") {
      return toString(o[k]);
    }

    o[k] = "" + o[k];
  });

  return o;
}

const AddSensor = () => {
  const [alert, setAlert] = React.useState(null);

  const getAllDeviceApi = useApi(deviceApi.getAllDevices);
  const getAllSensorTypesApi = useApi(sensorApi.getAllSensorTypes);
  const postAddSensorMasterApi = useApi(sensorApi.postAddSensorMaster);

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedSensorTypes, setSelectedSensorTypes] = useState(null);

  const [devices, setDevices] = useState([]);
  const [sensorTypes, setSensorTypes] = useState([]);

  const [existingSensors, setExistingSensors] = useState([]);
  const [addedSensors, setAddedSensors] = useState([]);

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

  async function setSensorTypesState() {
    const result = await getAllSensorTypesApi.request();
    if (result?.status !== 200) {
      showWarningAlert(setAlert, "Error while fetching sensor types");
      return;
    }
    const sensorTypesData = result.data;
    const dropdownSensorTypes = sensorTypesData.map((sensorType) => {
      return {
        value: sensorType,
        label: sensorType.sensor_name,
      };
    });
    setSensorTypes((prev) => dropdownSensorTypes);
  }

  async function handleAddSensor() {
    if (selectedDevice === null) {
      showWarningAlert(setAlert, "Select Device to continue");
      return;
    }
    if (selectedSensorTypes === null || selectedSensorTypes?.length === 0) {
      showWarningAlert(setAlert, "Select Sensor Type to continue");
      return;
    }

    setExistingSensors((prev) => []);

    const existingSensorsTemp = [];
    const addedSensorsTemp = [];
    for (const selectedSensorType of selectedSensorTypes) {
      const device_id = selectedDevice.value.device_id;
      const data = {
        device_id,
        ...cvtObjValuesToString(selectedSensorType.value),
      };
      const result = await postAddSensorMasterApi.request(data);
      if (result?.status !== 200) {
        existingSensorsTemp.push(selectedSensorType.value.sensor_name);
      } else {
        addedSensorsTemp.push(selectedSensorType.value.sensor_name);
      }
    }
    setExistingSensors((prev) => existingSensorsTemp);
    setAddedSensors((prev) => addedSensorsTemp);
  }

  useEffect(() => {
    setAllDeviceState();
    setSensorTypesState();
  }, []);

  return (
    <>
      <div className="content">
        {alert}
        <Card>
          <CardHeader>
            <h2>Add Sensors</h2>
          </CardHeader>
          <CardBody>
            {existingSensors?.length === 0 ? (
              ""
            ) : (
              <h5>Existing Sensors: {existingSensors.join(", ")}</h5>
            )}
            {addedSensors?.length === 0 ? (
              ""
            ) : (
              <h5>Added Sensors: {addedSensors.join(", ")}</h5>
            )}
            {getAllDeviceApi.loading ? (
              "Loading"
            ) : (
              <Form className="form-horizontal">
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
                <FormGroup>
                  <Select
                    className="react-select info"
                    classNamePrefix="react-select"
                    placeholder="Choose Sensor Type"
                    name="multipleSelect"
                    closeMenuOnSelect={false}
                    isMulti
                    value={selectedSensorTypes}
                    onChange={(value) => setSelectedSensorTypes(value)}
                    options={sensorTypes}
                  />
                </FormGroup>
              </Form>
            )}
          </CardBody>
          <CardFooter>
            <Row>
              <Label md="3" />
              <Col md="9">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddSensor();
                  }}
                  className="btn-fill"
                  color="primary"
                >
                  Add Sensors
                </Button>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AddSensor;
