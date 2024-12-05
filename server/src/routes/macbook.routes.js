const { Router } = require('express');
const { 
    createMacBook, 
    getAllMacBooks, 
    getMacBook, 
    updateMacBook, 
    deleteMacBook } = require('../controllers/macbook.controller');

const router = Router();

router.post('/macbook/post',createMacBook)

router.get('/macbook/get', getAllMacBooks)

router.get('/macbook/get/:id_macbook', getMacBook)

router.put('/macbook/put/:id_macbook', updateMacBook)

router.delete('/macbook/delete/:id_macbook', deleteMacBook)

module.exports = router;