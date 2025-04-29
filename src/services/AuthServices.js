import axios from "axios";
import http from "./http-common";

export const login = async (payload) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_PUBLIC_API_URL}v1/user/login`,
      payload
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const resetPassword = async (payload) => {
  try {
    const response = await http.post(`v1/user/change-password`, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};
