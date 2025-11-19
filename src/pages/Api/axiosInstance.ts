 
import axios, { AxiosError, AxiosInstance } from "axios";
import useAuthStore from "../../store/authStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const authStore = useAuthStore.getState();
  let token = authStore.accessToken;

  if (!token) {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      token = userObj.access_token;
    }
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      localStorage.clear();
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default api;
