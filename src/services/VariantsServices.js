import http from "./http-common";

export const createVariant = async (payload) => {
  try {
    const res = http.post("v1/variant/create", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};
