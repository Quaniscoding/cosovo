import axios from "axios";
import axiosInterceptor from "./axiosInterceptor.js";

const http = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

axiosInterceptor.setupInterceptors(http);
export default http;
