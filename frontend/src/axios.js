import axios from 'axios';

const api = axios.create({
  // Asegúrate que este puerto coincida con el de tu server.js
  baseURL: 'http://localhost:3000/api', 
});

// Interceptor para enviar el Token en cada petición automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;