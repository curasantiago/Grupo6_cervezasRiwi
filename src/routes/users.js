// -------------- Require's ------------------//
var express = require('express');
var router = express.Router();
var loggeado = require('../middlewares/routes/loggeado')
var validator = require('../middlewares/routes/validator')

// ------------------Controller Require ----------------//
const userController = require('../controllers/userController');  //pachi


router.post('/register', validator.userCreate, userController.processRegister); 
router.get('/register', userController.registro); 

router.get('/detail/:id', loggeado, userController.detail);
router.get('/edit/:id', loggeado, userController.edit);
router.post('/edit/:id', loggeado, userController.processEdit);

router.get('/login', userController.login); 
router.post('/login', userController.processLogin);

router.get('/pay', userController.pagar);

router.post('/logout', userController.logout);

module.exports = router;

