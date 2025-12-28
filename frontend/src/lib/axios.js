import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  //below code tells Axios to include credentials (cookies, auth headers, TLS certs) with the request.(Browser will send the request to server)
  withCredentials: true,
});
 export default axiosInstance