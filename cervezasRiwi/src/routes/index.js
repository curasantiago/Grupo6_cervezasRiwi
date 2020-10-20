var express = require('express');
var router = express.Router();
const { body, validationResult, check } = require('express-validator');
const validator = require('../middlewares/routes/validator');

const productsController = require('../controllers/productsController');
const userController = require('../controllers/userController');


/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index');
//});
router.get('/', productsController.show); 
//router.get('/login', (req, res) => {
//  res.render('login', {title: "Login"})
//})
router.get('/login', userController.login); 
//router.get('/ingreso', (req, res) => {
//  res.render('ingreso')
//})
router.get('/ingreso', productsController.ingresar); 
//router.get('/payForm', (req, res) => {
//  res.render('payForm')
//})
router.get('/payForm',productsController.pagar); 
//router.get('/productDetail', (req, res) => {
//  res.render('productDetail');
//})
router.get('/productDetail', productsController.detalle); 
//router.get('/productCart', (req, res) => {
//  res.render('productCart', {title: "Carrito de compras"});
//})
router.get('/productCart', productsController.carrito); 
//router.get('/productSearch', (req, res) => {
//  res.render('productSearch');
//})
router.get('/productSearch', productsController.buscar); 
//router.get('/registerForm', (req, res) => {
//  res.render('registerForm');
//})
router.get('/registerForm', productsController.registro); 
//router.get('/productCreate', (req, res) => {
//  res.render('productCreateForm');
//})
router.get('./create', productsController.crear); 
//router.get('/productEdit', (req, res) => {
//  res.render('productEditForm');
//})
router.get('/productEdit', productsController.editar); 


// router.post('/productCreate',
// [check("name")
//         .isInt()
//         .withMessage("Tiene que ser numero")
// ],
//   (req, res) => {
//     let errors = validationResult(req);
//     res.send(errors)
//   })
      
//router.post('/productCreate', validator.productCreate, (req, res) => {
//  let errors = validationResult(req);
//  
//  if(errors.errors == "") {
//      res.redirect('/') 
//     } else {
//      res.render('productCreateForm', {errors: errors.errors});
//    };
//})

module.exports = router;
