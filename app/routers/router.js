const express = require('express');
const router = express.Router();

const proyectos = require('../controllers/Proye.controller.js'); 

router.post('/api/proyectos/create', proyectos.create); 
router.get('/api/proyectos/all', proyectos.retrieveAllProyectos); 
router.put('/api/proyectos/update/:id', proyectos.updateById); 
router.delete('/api/proyectos/delete/:id', proyectos.deleteById); 

module.exports = router;


const tareas = require('../controllers/Tare.controller.js'); 

router.post('/api/tareas/create', tareas.create); 
router.get('/api/tareas/all', tareas.retrieveAllTareas);
router.put('/api/tareas/update/:id', tareas.updateById);
router.delete('/api/tareas/delete/:id', tareas.deleteById);

module.exports = router;

const usuarios = require('../controllers/Usua.controller.js');

router.post('/api/usuarios/create', usuarios.create);
router.get('/api/usuarios/all', usuarios.retrieveAllUsuarios);
router.put('/api/usuarios/update/:id', usuarios.updateById);
router.delete('/api/usuarios/delete/:id', usuarios.deleteById);

module.exports = router;