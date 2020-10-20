// -------------- Require's ------------------//
var express = require('express');
var router = express.Router();


// ------------------Controller Require ----------------//
const mainController = require('../controllers/mainController');  //pachi


//---------------vista-----------------------//
router.get('/', mainController.index);
router.get('/ingreso', mainController.ingresar); 

module.exports = router;