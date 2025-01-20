const { Router } = require('express');
const { 
    createMacBook, 
    getAllMacBooks, 
    getMacBook, 
    getMacBookByModel,
    getMacBookBySerial,
    getMacBookByColor,
    getMacBookSold,
    getMacBookNotSold,
    updateMacBook, 
    deleteMacBook 
} = require('../controllers/macbook.controller');

const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

const router = Router();

router.post('/macbook/post', verifyToken, checkRole(['admin']), createMacBook);

router.get('/macbook/get', verifyToken, checkRole(['admin', 'operador']), getAllMacBooks);

router.get('/macbook/get/:id_macbook', verifyToken, checkRole(['admin', 'operador']), getMacBook);

router.get('/macbook/model/:id_modelo', verifyToken, checkRole(['admin', 'operador']), getMacBookByModel);

router.get('/macbook/serial/:serial_num', verifyToken, checkRole(['admin', 'operador']), getMacBookBySerial);

router.get('/macbook/color/:color', verifyToken, checkRole(['admin', 'operador']), getMacBookByColor);

router.get('/macbook/notsold', verifyToken, checkRole(['admin', 'operador']), getMacBookNotSold);

router.get('/macbook/sold', verifyToken, checkRole(['admin', 'operador']), getMacBookSold);

router.put('/macbook/put/:id_macbook', verifyToken, checkRole(['admin']), updateMacBook);

router.delete('/macbook/delete/:id_macbook', verifyToken, checkRole(['admin']), deleteMacBook);

module.exports = router;
