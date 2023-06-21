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

export default { addDevice };
