import http from "./http-common";

export const getCategories = async (payload) => {
  return http.get("v1/category/get-all", payload);
};
