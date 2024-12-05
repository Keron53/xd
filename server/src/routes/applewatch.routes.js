const { Router } = require('express');
const { 
    createAppleWatch, 
    getAllAppleWatches, 
    getAppleWatch, 
    updateAppleWatch, 
    deleteAppleWatch } = require('../controllers/applewatch.controller');

const router = Router();

router.post('/applewatch/post',createAppleWatch)

router.get('/applewatch/get', getAllAppleWatches)

router.get('/applewatch/get/:id_applewatch', getAppleWatch)

router.put('/applewatch/put/:id_applewatch', updateAppleWatch)

router.delete('/applewatch/delete/:id_applewatch', deleteAppleWatch)

module.exports = router;