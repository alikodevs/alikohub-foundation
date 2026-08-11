import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
});

// Interceptor: Attach bearer token to request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: Handle expired token globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/admin-portal/login" && window.location.pathname !== "/auth") {
        window.location.href = "/admin-portal/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
