/*
Endpoints
http://localhost:3000/api/horarios/     metodo: POST   nuevo horario
http://localhost:3000/api/horarios/materia/id/   metodo: GET   consultar materia
http://localhost:3000/api/horarios/     metodo: GET   consultar horarios
http://localhost:3000/api/horarios/id/     metodo: PUT   actualizar horario con id
http://localhost:3000/api/horarios/id/     metodo: DELETE   eliminar horario con id
*/


const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth.middleware');
const controller = require('../controllers/horarios.controller');

// Crear nuevo horario
router.post('/', verificarToken, controller.crearHorario);

// Consultar horarios de una materia en particular (id_materia)
router.get('/materia/:id_materia', verificarToken, controller.obtenerHorariosPorMateria);

// Listar los horarios por materias
router.get('/', verificarToken, controller.obtenerHorarioCompleto);

// Actualizar horaio
router.put('/:id', verificarToken, controller.actualizarHorario);

// Eliminar horario
router.delete('/:id', verificarToken, controller.eliminarHorario);

module.exports = router;
