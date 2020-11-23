// -------------- Require's ------------------//
var express = require('express');
var router = express.Router();


// ------------------Controller Require ----------------//
const userController = require('../controllers/userController');  //pachi


router.post('/register', userController.processRegister); 
router.get('/register', userController.registro); 

router.get('/detail/:id', userController.detail);
router.get('/edit/:id', userController.edit);
router.post('/edit/:id', userController.processEdit);

router.get('/login', userController.login); 
router.post('/login', userController.processLogin);

router.get('/pay', userController.pagar);

module.exports = router;

