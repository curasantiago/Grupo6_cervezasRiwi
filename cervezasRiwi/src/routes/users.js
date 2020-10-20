// -------------- Require's ------------------//
var express = require('express');
var router = express.Router();


// ------------------Controller Require ----------------//
const userController = require('../controllers/userController');  //pachi


//---------------vista-----------------------//
router.get('/register', userController.registro); 
router.get('/login', userController.login); 
router.get('/pay', userController.pagar);

module.exports = router;

