const { Router } = require('express');
const { 
    createIPad, 
    getAllIPads, 
    getIPad, 
    getIPadByModel,
    getIPadByColor,
    getIPadsNotSold,
    getIPadsSold,
    updateIPad, 
    deleteIPad 
} = require('../controllers/ipad.controller');

const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

const router = Router();

router.post('/ipad/post', verifyToken, checkRole(['admin']), createIPad);

router.get('/ipad/get', verifyToken, checkRole(['admin', 'operador']), getAllIPads);

router.get('/ipad/get/:id_ipad', verifyToken, checkRole(['admin', 'operador']), getIPad);

router.get('/ipad/get/model/:id_modelo', verifyToken, checkRole(['admin', 'operador']), getIPadByModel);

router.get('/ipad/get/color/:color', verifyToken, checkRole(['admin', 'operador']), getIPadByColor);

router.get('/ipad/notsold', verifyToken, checkRole(['admin', 'operador']), getIPadsNotSold);

router.get('/ipad/sold', verifyToken, checkRole(['admin', 'operador']), getIPadsSold);

router.put('/ipad/put/:id_ipad', verifyToken, checkRole(['admin']), updateIPad);

router.delete('/ipad/delete/:id_ipad', verifyToken, checkRole(['admin']), deleteIPad);

module.exports = router;
