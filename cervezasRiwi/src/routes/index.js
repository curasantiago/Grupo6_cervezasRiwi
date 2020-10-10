var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login')
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
  res.render('productCart');
})

router.get('/registerForm', (req, res) => {
  res.render('registerForm');
})

router.get('/productCreate', (req, res) => {
  res.render('productCreateForm.ejs');
})

module.exports = router;
