import Cookies from "js-cookie";

const axiosInterceptor = {
  setupInterceptors: (axios, isToken = false, isFormData = false) => {
    axios.interceptors.request.use(
      (config) => {
        if (isToken) {
          return config;
        }

        let token = Cookies.get("token");

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        if (isFormData) {
          config.headers["Content-Type"] = "multipart/form-data";
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // axios.interceptors.response.use(
    //   (response) => response,
    //   (error) => {
    //     if (error.response?.status === 401) {
    //       Cookies.remove("token");
    //       // window.location.href = "/dang-nhap";
    //       return Promise.reject(error);
    //     }
    //     return Promise.reject(error);
    //   }
    // );
  },
};

export default axiosInterceptor;
