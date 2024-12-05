const { Router } = require('express');
const { 
    createIPhone, 
    getAllIPhone, 
    getIPhone, 
    updateIPhone, 
    deleteIPhone } = require('../controllers/iphone.controller');

const router = Router();

router.post('/iphone/post',createIPhone)

router.get('/iphone/get', getAllIPhone)

router.get('/iphone/get/:id_telf', getIPhone)

router.put('/iphone/put/:id_telf', updateIPhone)

router.delete('/iphone/delete/:id_telf', deleteIPhone)

module.exports = router;