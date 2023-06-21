import apiClient from "../client";

const login = async (email, password) => {
  const result = await apiClient.post("/auth/login", { email, password });
  if (result.status === 200) {
    const accessToken = result.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
  }

  return result;
};

const logout = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken !== null) {
    const result = await apiClient.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (result.status === 200) {
      localStorage.setItem("accessToken", null);
    }
    return result;
  }
  return null;
};

const registerAsAdmin = async (data) => {
  const {
    email,
    firstName,
    lastName,
    country,
    state,
    city,
    zip,
    address,
    contactNumber,
    password,
  } = data;
  return await apiClient.post("/auth/register-admin", {
    email,
    firstName,
    lastName,
    country,
    state,
    city,
    zip,
    address,
    contact_number: contactNumber,
    password,
  });
};

const registerAsCustomer = async (data) => {
  const {
    email,
    firstName,
    lastName,
    country,
    state,
    city,
    zip,
    address,
    contactNumber,
    password,
  } = data;
  return await apiClient.post("/auth/register-customer", {
    email,
    firstName,
    lastName,
    country,
    state,
    city,
    zip,
    address,
    contact_number: contactNumber,
    password,
  });
};

const registerAsTenant = async (data) => {
  const {
    email,
    firstName,
    lastName,
    country,
    state,
    city,
    zip,
    address,
    contactNumber,
    password,
  } = data;
  return await apiClient.post("/auth/register-tenant", {
    email,
    firstName,
    lastName,
    country,
    state,
    city,
    zip,
    address,
    contact_number: contactNumber,
    password,
  });
};

export default {
  login,
  logout,
  registerAsAdmin,
  registerAsCustomer,
  registerAsTenant,
};
