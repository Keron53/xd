const { Router } = require('express');
const { 
    createPagoPlanAcum, 
    getAllPagosPlanAcum, 
    getPagoPlanAcum, 
    updatePagoPlanAcum, 
    deletePagoPlanAcum } = require('../controllers/pago_plan_acum.controller');

const router = Router();

router.post('/ppa/post',createPagoPlanAcum)

router.get('/ppa/get', getAllPagosPlanAcum)

router.get('/ppa/get/:id_pago', getPagoPlanAcum)

router.put('/ppa/put/:id_pago', updatePagoPlanAcum)

router.delete('/ppa/delete/:id_pago', deletePagoPlanAcum)

module.exports = router;