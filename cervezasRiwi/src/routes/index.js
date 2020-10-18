var express = require('express');
var router = express.Router();
const { body, validationResult, check } = require('express-validator');
const validator = require('../middlewares/routes/validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
//router.get('/', ProductController.show); CP
router.get('/login', (req, res) => {
  res.render('login', {title: "Login"})
})
//router.get('/login', userController.login); CP
router.get('/ingreso', (req, res) => {
  res.render('ingreso')
})
//router.get('/ingreso', userController.ingresar); CP
router.get('/payForm', (req, res) => {
  res.render('payForm')
})
//router.get('/payForm',productController.pagar); CP
router.get('/productDetail', (req, res) => {
  res.render('productDetail');
})
//router.get('/productDetail', productController.detalle); CP
router.get('/productCart', (req, res) => {
  res.render('productCart', {title: "Carrito de compras"});
})
//router.get('/productCart', productController.carrito); CP
router.get('/productSearch', (req, res) => {
  res.render('productSearch');
})
//outer.get('/productSearch', productController.buscar); CP
router.get('/registerForm', (req, res) => {
  res.render('registerForm');
})
//router.post('/registerForm', productController.registro); CP
router.get('/productCreate', (req, res) => {
  res.render('productCreateForm');
})
//router.post('./Create', productController.crear); CP
router.get('/productEdit', (req, res) => {
  res.render('productEditForm');
})
//outer.get('/productEdit', productController.editar); CP


// router.post('/productCreate',
// [check("name")
//         .isInt()
//         .withMessage("Tiene que ser numero")
// ],
//   (req, res) => {
//     let errors = validationResult(req);
//     res.send(errors)
//   })
      
router.post('/productCreate', validator.productCreate, (req, res) => {
  let errors = validationResult(req);
  
  if(errors.errors == "") {
      res.redirect('/') 
     } else {
      res.render('productCreateForm', {errors: errors.errors});
    };
})

module.exports = router;
