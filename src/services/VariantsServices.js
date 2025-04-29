import http from "./http-common";

export const createVariant = async (payload) => {
  return http.post("v1/variant/create", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
