/**
 * Axios instance for admin API calls
 * Automatically attaches JWT token to every request
 */
import axios from "axios";
import { getAdminToken, removeAdminToken } from "./auth";

const axiosAdmin = axios.create({
  baseURL: "http://localhost:5000",
});

// Attach token to every request
axiosAdmin.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If 401 received, clear token and redirect to login
axiosAdmin.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      removeAdminToken();
      window.location.hash = "#/admin";
    }
    return Promise.reject(err);
  }
);

export default axiosAdmin;
