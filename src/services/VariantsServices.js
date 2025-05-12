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

export const getVariantDetails = async (ids) => {
  // ids có thể là 1 id hoặc mảng id
  if (Array.isArray(ids)) {
    // Promise.all để lấy tất cả variant details
    const results = await Promise.all(
      ids.map(async (id) => {
        try {
          const res = await http.get(`variant/get/${id}`);
          return { id, data: res.data.data, error: null };
        } catch (error) {
          return {
            id,
            data: null,
            error: error.response?.status === 404 ? "Not found" : error.message,
          };
        }
      })
    );
    return { data: results };
  } else {
    // Trường hợp 1 id
    try {
      const res = await http.get(`variant/get/${ids}`);
      return { data: res.data.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.status === 404 ? "Not found" : error.message,
      };
    }
  }
};
