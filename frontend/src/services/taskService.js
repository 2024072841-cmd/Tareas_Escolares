import api from './api';

export const taskService = {
  getAll: () => api.get('/tareas'),
  // Este es el que usa el botón:
  create: (data) => api.post('/tareas', data), 
  delete: (id) => api.delete(`/tareas/${id}`)
};