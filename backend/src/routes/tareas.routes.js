const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth.middleware');
const controller = require('../controllers/tareas.controller');

/*
Endpoints.
http://localhost:3000/tareas/  metodo: POST    nueva tarea
http://localhost:3000/tareas/  metodo: POST    listar todas las tareas
http://localhost:3000/tareas/id  metodo: GET   listar 1 tarea
http://localhost:3000/tareas/id  metodo: PUT   actualizar tarea
http://localhost:3000/tareas/id/completar  metodo: PATCH   cambiar estado
http://localhost:3000/tareas/id  metodo: DELETE   borrar tarea
http://localhost:3000/tareas/estado/pendiente   metodo GET
http://localhost:3000/tareas/estado/vencida     metodo GET
http://localhost:3000/tareas/estado/completada  metodo GET
*/

// crear una nueva tarea
router.post('/', verificarToken, controller.crearTarea);

// consultar todas las treas
router.get('/', verificarToken, controller.obtenerTodasLasTareas);

// consultar una tarea según su id
router.get('/:id', verificarToken, controller.obtenerTareaPorId);

// actualizar una tarea
router.put('/:id', verificarToken, controller.actualizarTarea);

// marcar como comletada una tarea
router.patch('/:id/completar', verificarToken, controller.marcarComoCompletada);

// eliminar una tarea por id
router.delete('/:id', verificarToken, controller.eliminarTarea);

// Endpoints adicinales
// tareas pendientes
router.get('/estado/pendientes', verificarToken, controller.tareasPendientes);

// tareas vencidas
router.get('/estado/vencidas', verificarToken, controller.tareasVencidas);

// tareas completadas
router.get('/estado/completadas', verificarToken, controller.tareasCompletadas);

module.exports = router;