const { Router } = require('express');
const { 
    createModel, 
    getAllModels, 
    getModel, 
    updateModel, 
    deleteModel } = require('../controllers/modelo.controller');

const router = Router();

router.post('/modelo/post',createModel)

router.get('/modelo/get', getAllModels)

router.get('/modelo/get/:id_modelo', getModel)

router.put('/modelo/put/:id_modelo', updateModel)

router.delete('/modelo/delete/:id_modelo', deleteModel)

module.exports = router;