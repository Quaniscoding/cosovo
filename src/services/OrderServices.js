import http from "./http-common";

export const createOrder = (data) => {
  const res = http.post("v1/order/create", data);
  return res;
};
