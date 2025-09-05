
// Axios instance for all API calls
import axios from 'axios';

const api = axios.create({
  baseURL: "https://reviews-app-backend-l5ao.onrender.com/", // backend server URL
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: add token and log outgoing requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  // Log outgoing request for traceability
  console.log(`[api.js] Request: ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
  return config;
});

// Response interceptor: log responses and errors
api.interceptors.response.use(
  (response) => {
    console.log(`[api.js] Response:`, response.status, response.data);
    return response;
  },
  (error) => {
    console.error(`[api.js] API Error:`, error?.response?.status, error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
