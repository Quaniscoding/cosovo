// services/ProductsServices.js
import http from "./http-common";

export const getProducts = async (payload) => {
  return http.post("v1/product/get-all", payload);
};

export const getProductsDetails = async (id) => {
  return http.get(`v1/product/get/${id}`);
};

export const createProduct = async (payload) => {
  return http.post("v1/product/create", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
