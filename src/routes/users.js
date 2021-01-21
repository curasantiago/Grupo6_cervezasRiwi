// -------------- Require's ------------------//
var express = require('express');
var router = express.Router();
var loggeado = require('../middlewares/routes/loggeado')
var validator = require('../middlewares/routes/validator')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images/users'));
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


// ------------------Controller Require ----------------//
const userController = require('../controllers/userController');  //pachi


router.post('/register', upload.single('image'), validator.userCreate, userController.processRegister); 
router.get('/register', userController.registro); 

router.get('/detail/:id', loggeado, userController.detail);
router.get('/edit/:id', loggeado, userController.edit);
router.post('/edit/:id', loggeado,  upload.single('image'), userController.processEdit);

router.get('/carts/:id', loggeado, userController.userCarts);
router.get('/carts/:id/:idCart/', loggeado, userController.purchaseHistory);

router.get('/login', userController.login); 
router.post('/login', userController.processLogin);
router.post('/forgot', userController.forgotPass);


router.get('/pay', userController.pagar);

router.post('/logout', userController.logout);

module.exports = router;

