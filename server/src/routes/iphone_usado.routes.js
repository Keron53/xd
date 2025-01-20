const { Router } = require('express');
const { 
    createIPhoneUsed, 
    getAllIPhoneUsed, 
    getIPhoneUsed, 
    getIPhoneUsedByModel,
    getIPhoneUsedByIMEI,
    getIPhoneUsedByColor,
    getIPhoneUsedNotSold,
    getIPhoneUsedSold,
    updateIPhoneUsed, 
    deleteIPhoneUsed 
} = require('../controllers/iphone_usado.controller');

const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

const router = Router();

router.post('/iphoneused/post', verifyToken, checkRole(['admin']), createIPhoneUsed);

router.get('/iphoneused/get', verifyToken, checkRole(['admin', 'operador']), getAllIPhoneUsed);

router.get('/iphoneused/get/:id_iphone_usado', verifyToken, checkRole(['admin', 'operador']), getIPhoneUsed);

router.get('/iphoneused/model/:id_modelo', verifyToken, checkRole(['admin', 'operador']), getIPhoneUsedByModel);

router.get('/iphoneused/imei/:imei', verifyToken, checkRole(['admin', 'operador']), getIPhoneUsedByIMEI);

router.get('/iphoneused/color/:color', verifyToken, checkRole(['admin', 'operador']), getIPhoneUsedByColor);

router.get('/iphoneused/sold', verifyToken, checkRole(['admin', 'operador']), getIPhoneUsedSold);

router.get('/iphoneused/notsold', verifyToken, checkRole(['admin', 'operador']), getIPhoneUsedNotSold);

router.put('/iphoneused/put/:id_iphone_usado', verifyToken, checkRole(['admin']), updateIPhoneUsed);

router.delete('/iphoneused/delete/:id_iphone_usado', verifyToken, checkRole(['admin']), deleteIPhoneUsed);

module.exports = router;
