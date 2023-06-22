import apiClient from "../client";

const addDevice = async (data) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken === null) {
    return;
  }
  return await apiClient.post("/device/add", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const getAllDevices = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken === null) {
    return;
  }
  return await apiClient.get("/device/get-all-devices", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const getMyDevices = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken === null) {
    return;
  }
  return await apiClient.get("/device/get-my-devices", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export default { addDevice, getAllDevices, getMyDevices };
