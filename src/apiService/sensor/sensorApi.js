import apiClient from "apiService/client";

const getAllSensorTypes = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken === null) {
    return;
  }
  return await apiClient.get("/sensorType/get", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const postAddSensorMaster = async (data) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken === null) {
    return;
  }
  return await apiClient.post("/sensorMaster/add", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const getSensorsOfDevice = async (deviceId) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken === null) {
    return;
  }
  return await apiClient.post(
    "/sensorMaster/get-sensors-of-device",
    { device_id: deviceId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export default { getAllSensorTypes, postAddSensorMaster, getSensorsOfDevice };
