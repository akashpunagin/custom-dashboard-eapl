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

export default { getAllSensorTypes, postAddSensorMaster };
