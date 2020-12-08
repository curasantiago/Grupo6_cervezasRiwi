// -------------- Require's ------------------//
var express = require('express');
var router = express.Router();
let { Products, Categories, SubCategories, Sizes, Users, Cards, Carts, Purchases, Purchase_histories, Admins } = require('../database/models')

// ------------------Controller Require ----------------//
const mainController = require('../controllers/mainController');  //pachi


//---------------vista-----------------------//
router.get('/', mainController.index);
router.get('/pruebaLogin', (req, res) => {
    if(req.session.usuarioLoggeado) {
        res.send("Hay session")
    } else {
        res.send("no hay session")
    }
})
router.get('/ingreso', mainController.ingresar);
router.get('/probandoData', async (req, res) => {
    let products = await Products.findAll({
        include: ['subcategory', 'size']
    });
    let categories = await Categories.findAll({
        include: ['categories_subcategory']
    });
    let subCategories = await SubCategories.findAll({
        include: ['subcategory_categories']
    });
    let sizes = await Sizes.findAll({
        include: ['size_product']
    });
    let users = await Users.findAll();

    let cards = await Cards.findAll();
    let carts = await Carts.findAll();
    let purchases = await Purchases.findAll();
    let Purchase_history = await Purchase_histories.findAll();
    let admins = await Admins.findAll();

    res.json(Admins);
})

module.exports = router;