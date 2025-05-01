import http from "./http-common";

export const getCategories = async () => {
  return http.get("v1/category/get-all");
};
