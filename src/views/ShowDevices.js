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
        <Card>
          <CardHeader>
            <CardTitle tag="h2">All Devices</CardTitle>
          </CardHeader>
          <CardBody>
            {getAllDevicesApi.loading ? "Loading All Devices" : ""}
            {getAllDevicesApi.data !== null && (
              <Fragment>
                <Row>
                  <Col sm="1">
                    <p className="text-muted"> </p>
                  </Col>
                  <Col>
                    <p className="text-muted">Device Id</p>
                  </Col>
                  <Col>
                    <p className="text-muted">Client Topic</p>
                  </Col>
                  <Col></Col>
                </Row>
                <br></br>
                {getAllDevicesApi.data.map((device, index) => {
                  return (
                    <Fragment>
                      <Row>
                        <Col sm="1">
                          <p className="text-muted">{`${index + 1})`}</p>
                        </Col>
                        <Col>
                          <p className="text-muted">{device.device_id}</p>
                        </Col>
                        <Col>
                          <p className="text-muted">{device.client_topic}</p>
                        </Col>
                        <Col>
                          <Button size="sm" color="info">
                            Monitor Sensors
                          </Button>
                        </Col>
                      </Row>
                      <hr></hr>
                    </Fragment>
                  );
                })}
              </Fragment>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ShowDevices;
