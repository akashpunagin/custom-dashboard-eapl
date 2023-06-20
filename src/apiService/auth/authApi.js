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

export default { login, logout };
