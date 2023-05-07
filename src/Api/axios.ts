import axios, { AxiosInstance } from "axios";
import { getAccessToken } from "@/Data/DataSource/Cookie/JWT.cookie";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default instance;
