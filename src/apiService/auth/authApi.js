import apiClient from "../client";

const login = async (email, password) => {
  const result = await apiClient.post("/auth/login", { email, password });
  if (result.status === 200) {
    const accessToken = result.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
  }

  return result;
};

export default {
  login,
};
