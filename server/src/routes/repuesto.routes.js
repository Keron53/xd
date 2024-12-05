const { Router } = require('express');
const { 
    createRepuesto, 
    getAllRepuestos, 
    getRepuesto, 
    updateRepuesto, 
    deleteRepuesto } = require('../controllers/repuesto.controller');

const router = Router();

router.post('/repuesto/post',createRepuesto)

router.get('/repuesto/get', getAllRepuestos)

router.get('/repuesto/get/:id_repuesto', getRepuesto)

router.put('/repuesto/put/:id_repuesto', updateRepuesto)

router.delete('/repuesto/delete/:id_repuesto', deleteRepuesto)

module.exports = router;