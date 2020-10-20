// -------------- Require's ------------------//
var express = require('express');
var router = express.Router();


// ------------------Controller Require ----------------//
const userController = require('../controllers/userController');  //pachi


/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

//---------------vista-----------------------//
router.get('/', userController.usuario); 

module.exports = router;

