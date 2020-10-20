var express = require('express');
var router = express.Router();
// const { body, validationResult, check } = require('express-validator');
// const validator = require('../middlewares/routes/validator');

const productsController = require('../controllers/productsController');

router.get('/detail', productsController.detalle); 
router.get('/cart', productsController.carrito); 
router.get('/search', productsController.buscar); 
router.get('/create', productsController.crear); 
router.get('/edit', productsController.editar); 


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
