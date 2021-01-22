const express = require('express');
const router = express.Router();
const apiProductController = require('../../controllers/apiController/apiProductsController')


router.get('/', apiProductController.listar);

// router.get('/cart', productsController.carrito); 

// router.get('/create', productsController.crear); 
// router.post('/create', upload.single('image'), validator.productCreate, productsController.processCreate);  // CHEQUEAR MAS TARDE

// router.get('/:id/edit', productsController.editar); 
// router.put('/:id', upload.single('image'), validator.productEdit, productsController.processEdit);

router.get('/purchases', apiProductController.listarCompras);
router.get('/:id', apiProductController.detalle);


// router.post('/', productsController.buscar);

// router.post('/productDetail', productsController.buscar);

// router.delete('/:id', productsController.processDelete);

module.exports = router;