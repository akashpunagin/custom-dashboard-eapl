import axios from "axios";
// require("dotenv").config();

const apiClient = axios.create({
  // baseURL: process.env.BASE_URL,
  baseURL: "http://localhost:8080",
});

export default apiClient;
