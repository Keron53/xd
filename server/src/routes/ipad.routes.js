const { Router } = require('express');
const { 
    createIPad, 
    getAllIPads, 
    getIPad, 
    updateIPad, 
    deleteIPad } = require('../controllers/ipad.controller');

const router = Router();

router.post('/ipad/post',createIPad)

router.get('/ipad/get', getAllIPads)

router.get('/ipad/get/:id_ipad', getIPad)

router.put('/ipad/put/:id_ipad', updateIPad)

router.delete('/ipad/delete/:id_ipad', deleteIPad)

module.exports = router;