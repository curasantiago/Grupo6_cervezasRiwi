// -------------- Require's ------------------//
var express = require('express');
var router = express.Router();
let { Products, Categories, SubCategories, Sizes, Users } = require('../database/models')

// ------------------Controller Require ----------------//
const mainController = require('../controllers/mainController');  //pachi


//---------------vista-----------------------//
router.get('/', mainController.index);
router.get('/ingreso', mainController.ingresar);
router.get('/probandoData', async (req, res) => {
    // let products = await Products.findAll();
    // let categories = await Categories.findAll();
    // let subCategories = await SubCategories.findAll();
    // let sizes = await Sizes.findAll();
    let users = await Users.findAll();
    res.json(users);
})

module.exports = router;