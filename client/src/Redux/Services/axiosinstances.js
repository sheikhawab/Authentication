import axios from "axios";
const axiosinstances = axios.create({
  baseURL: "http://localhost:2422",
  withCredentials: true, 
});
export default axiosinstances;
