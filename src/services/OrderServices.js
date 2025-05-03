import axios from "axios";
import http from "./http-common";

export const createOrder = async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_PUBLIC_API_URL}order/create`,
    data
  );
  return res;
};
export const adminCreateOrder = async (data) => {
  const res = await http.post(`order/create`, data);
  return res;
};
export const getAllOrders = async (payload) => {
  return http.post("order/get-all", payload);
};

export const updatePrepareOrder = async (id) => {
  const res = http.put(`order/update-prepared/${id}`);
  return res;
};

export const deleteOrder = async (id) => {
  const res = http.patch(`order/delete/${id}`);
  return res;
};
