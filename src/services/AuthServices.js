import axios from "axios";
import http from "./http-common";

export const login = async (payload) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_PUBLIC_API_URL}user/login`,
      payload
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const resetPassword = async (payload) => {
  try {
    const res = await http.post(`user/change-password`, payload);
    return res.data;
  } catch (error) {
    return error;
  }
};
