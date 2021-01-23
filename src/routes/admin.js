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
const adminController = require('../controllers/adminController');  //pachi



router.get('/administrador', adminController.ingresoAdmin); 
router.post('/administrador', adminController.processIngresoAdmin);

router.post('/logout', adminController.logout);
router.get('/panel', adminController.panel);

module.exports = router;

