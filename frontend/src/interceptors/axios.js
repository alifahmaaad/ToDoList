import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVERHOST;
axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      originalRequest._retry = true;
      const response = await axios.get("refresh", { withCredentials: true });
      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data["token"]}`;
        originalRequest.headers.Authorization = `Bearer ${response.data["token"]}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);
