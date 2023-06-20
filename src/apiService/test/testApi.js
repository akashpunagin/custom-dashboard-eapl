import apiClient from "../client";

const getTestApi = () => apiClient.get("/");

export default {
  getTestApi,
};
