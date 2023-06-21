import apiClient from "apiService/client";

const myProfile = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken === null) {
    return;
  }
  return await apiClient.get("/profile/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export default { myProfile };
