const { Router } = require('express');
const { 
    createServicioTecnico, 
    getAllServiciosTecnicos, 
    getServicioTecnico, 
    updateServicioTecnico, 
    deleteServicioTecnico } = require('../controllers/servicio_tecnico.controller');

const router = Router();

router.post('/st/post',createServicioTecnico)

router.get('/st/get', getAllServiciosTecnicos)

router.get('/st/get/:id_servicio_tecnico', getServicioTecnico)

router.put('/st/put/:id_servicio_tecnico', updateServicioTecnico)

router.delete('/st/delete/:id_servicio_tecnico', deleteServicioTecnico)

module.exports = router;