// src/utils/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Add interceptor to include token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Consider HttpOnly cookies for production
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default api
