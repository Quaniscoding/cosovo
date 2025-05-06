// services/ProductsServices.js
import http from "./http-common";

export const getProducts = async (payload) => {
  return http.post("product/get-all", payload);
};

export const getProductsDetails = async (id) => {
  return http.get(`product/get/${id}`);
};

export const createProduct = async (payload) => {
  return http.post("product/create", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProduct = async (payload, product_id) => {
  return http.put(`product/update/${product_id}`, payload);
};

export const deleteProduct = async (id) => {
  return http.patch(`product/delete/${id}`);
};
