// -------------- Require's ------------------//
var express = require('express');
var router = express.Router();


// ------------------Controller Require ----------------//
const userController = require('../controllers/userController');  //pachi


//---------------vista-----------------------//
router.get('/register', userController.registro); 
// router.post('/register', userController.processRegister); 

router.get('/login', userController.login); 
// router.post('/login', userController.processLogin);

router.get('/pay', userController.pagar);

module.exports = router;

