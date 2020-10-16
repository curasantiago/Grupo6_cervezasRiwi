var express = require('express');
var router = express.Router();
const { body, validationResult, check } = require('express-validator');
const validator = require('../middlewares/routes/validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login', {title: "Login"})
})

router.get('/ingreso', (req, res) => {
  res.render('ingreso')
})

router.get('/payForm', (req, res) => {
  res.render('payForm')
})

router.get('/productDetail', (req, res) => {
  res.render('productDetail');
})

router.get('/productCart', (req, res) => {
  res.render('productCart', {title: "Carrito de compras"});
})

router.get('/registerForm', (req, res) => {
  res.render('registerForm');
})

router.get('/productCreate', (req, res) => {
  res.render('productCreateForm');
})

router.get('/productEdit', (req, res) => {
  res.render('productEditForm');
})

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
