import { useState } from "react";

function apiLogger(result) {
  console.log("\n\n");
  console.log("------API LOGGER------");
  console.log("URL:", result.config.url);
  console.log("STATUS CODE:", result.status);
  console.log("DATA:", result.data);
  console.log("------API LOGGER------");
  console.log("\n\n");
}

export default (apiFunc) => {
  const [data, setData] = useState(null);
  const [status, setstatus] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    let result;
    setLoading(true);
    try {
      result = await apiFunc(...args);

      apiLogger(result);

      setData(result.data);
      setstatus(result.status);
      setError("");
    } catch (err) {
      result = null;

      setData(null);
      setstatus(err.response?.status);
      if (err.response?.data.error !== undefined) {
        setError(err.response?.data.error);
      } else {
        setError(err.message || "Unexpected Error!");
      }
    } finally {
      setLoading(false);
    }
    return result;
  };

  return {
    data,
    error,
    loading,
    status,
    request,
  };
};
