import apiClient from "../client";

const getCustomers = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken === null) {
    return;
  }
  return await apiClient.get("/customer/get-all", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const assignDeviceToTenant = async (deviceId, tenantId) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken === null) {
    return;
  }
  return await apiClient.post(
    "/customer/deviceTenants/add",
    { tenantId, deviceId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export default { getCustomers, assignDeviceToTenant };
