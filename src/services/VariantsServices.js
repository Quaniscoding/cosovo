import http from "./http-common";

export const createVariant = async (payload) => {
  try {
    const res = http.post("variant/create", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const updateVariant = async (payload) => {
  try {
    const res = http.put(`variant/update`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteVariant = async (id) => {
  try {
    const res = http.delete(`variant/delete/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
