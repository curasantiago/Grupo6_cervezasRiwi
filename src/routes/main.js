// -------------- Require's ------------------//
var express = require('express');
var router = express.Router();
let { Products } = require('../database/models')

// ------------------Controller Require ----------------//
const mainController = require('../controllers/mainController');  //pachi


//---------------vista-----------------------//
router.get('/', mainController.index);
router.get('/ingreso', mainController.ingresar);
router.get('/probandoData', async (req, res) => {
    let products = await Products.findAll();
    res.json(products)
})

module.exports = router;