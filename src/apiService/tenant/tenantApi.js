import apiClient from "../client";

const getTenants = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken === null) {
    return;
  }
  return await apiClient.get("/tenant/get-all", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const getTenantsByCustomerId = async (customerUserId) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken === null) {
    return;
  }
  return await apiClient.post(
    "/tenant/get-by-customer-id",
    { customerId: customerUserId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export default { getTenants, getTenantsByCustomerId };
