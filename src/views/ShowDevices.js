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
import useApi from "hooks/useApi";
import deviceApi from "apiService/device/deviceApi";

const ShowDevices = () => {
  const getAllDevicesApi = useApi(deviceApi.getAllDevices);

  async function setDevices() {
    await getAllDevicesApi.request();
  }

  useEffect(() => {
    setDevices();
  }, []);

  return (
    <>
      <div className="content">
        <br></br>
        <h2>All Devices</h2>
        {getAllDevicesApi.loading ? <h3>{"Loading All Devices"}</h3> : ""}
        {getAllDevicesApi.data !== null && (
          <Fragment>
            <br></br>
            {getAllDevicesApi.data.map((device, index) => {
              return (
                <Card
                  style={{
                    border: "3px #1E1E28 solid",
                    "border-radius": "10px",
                  }}
                >
                  <CardBody>
                    <Fragment key={index}>
                      <Row>
                        <Col md="10">
                          <h4 className="text-muted">
                            {`${index + 1})`} Device Id: {device.device_id}
                          </h4>
                          <h4 className="text-muted pl-3">
                            Client Topic: {device.client_topic}
                          </h4>
                        </Col>
                        <Col md="2">
                          <Button size="sm" color="info">
                            Monitor Sensors
                          </Button>
                        </Col>
                      </Row>
                      <hr></hr>
                    </Fragment>
                  </CardBody>
                </Card>
              );
            })}
          </Fragment>
        )}
      </div>
    </>
  );
};

export default ShowDevices;
