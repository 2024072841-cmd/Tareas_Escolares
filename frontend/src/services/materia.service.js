import api from './api';

export const materiaService = {
  getAll: () => api.get('/materias'),
  
  // Listar materias de un periodo específico
  getByPeriodo: (id_periodo) => api.get(`/materias/${id_periodo}`),
  
  // Crear: requiere { nombre, profesor, id_periodo }
  create: (data) => api.post('/materias', data),
  
  delete: (id) => api.delete(`/materias/${id}`)
};