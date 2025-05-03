import http from "./http-common";

export const getCategories = async () => {
  return http.get("category/get-all");
};
