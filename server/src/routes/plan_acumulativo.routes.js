const { Router } = require('express');
const { 
    createPlanAcumulativo, 
    getAllPlanesAcumulativos, 
    getPlanAcumulativo, 
    updatePlanAcumulativo, 
    deletePlanAcumulativo } = require('../controllers/plan_acumulativo.controller');

const router = Router();

router.post('/pa/post',createPlanAcumulativo)

router.get('/pa/get', getAllPlanesAcumulativos)

router.get('/pa/get/:id_plan_acum', getPlanAcumulativo)

router.put('/pa/put/:id_plan_acum', updatePlanAcumulativo)

router.delete('/pa/delete/:id_plan_acum', deletePlanAcumulativo)

module.exports = router;