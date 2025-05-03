import http from "./http-common";

export const getAllRevenue = async (payload) => {
  return http.post("revenue/get-all", payload);
};
