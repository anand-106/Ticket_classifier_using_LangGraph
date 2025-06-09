import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export function useApi() {
  const { getAccessTokenSilently } = useAuth0();

  const callAPI = async (url, method = "get", data = null, config = {}) => {
    try {
      const token = await getAccessTokenSilently();
      console.log("token accesed");
      const response = await axios({
        url,
        method,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          ...config.headers,
        },
        ...config,
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error("API call failed:", err.response?.data || err.message);
      throw err;
    }
  };
  return { callAPI };
}
