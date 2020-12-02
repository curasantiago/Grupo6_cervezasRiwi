const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


// const { body, validationResult, check } = require('express-validator');
// const validator = require('../middlewares/routes/validator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images/products'));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
   
const upload = multer({ storage: storage,
    fileFilter: (req, file, cb) => {
        const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
        const ext = path.extname(file.originalname);
            if (!acceptedExtensions.includes(ext)) {
                req.file = file;
            }
        cb(null, acceptedExtensions.includes(ext));
    } 
});
  

const productsController = require('../controllers/productsController');

 
router.get('/cart', productsController.carrito); 

router.get('/create', productsController.crear); 
router.post('/create', upload.any(), productsController.processCreate);  // CHEQUEAR MAS TARDE

router.get('/:id/edit', productsController.editar); 
router.put('/:id', upload.any(), productsController.processEdit);

router.get('/:id', productsController.detalle);

router.get('/', productsController.listar);

router.post('/', productsController.buscar);

router.post('/productDetail', productsController.buscar);



router.delete('/:id', productsController.processDelete);



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
