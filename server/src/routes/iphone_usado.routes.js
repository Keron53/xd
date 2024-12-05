const { Router } = require('express');
const { 
    createIPhoneUsed, 
    getAllIPhoneUsed, 
    getIPhoneUsed, 
    updateIPhoneUsed, 
    deleteIPhoneUsed } = require('../controllers/iphone_usado.controller');

const router = Router();

router.post('/iphoneused/post',createIPhoneUsed)

router.get('/iphoneused/get', getAllIPhoneUsed)

router.get('/iphoneused/get/:id_telf_usado', getIPhoneUsed)

router.put('/iphoneused/put/:id_telf_usado', updateIPhoneUsed)

router.delete('/iphoneused/delete/:id_telf_usado', deleteIPhoneUsed)

module.exports = router;