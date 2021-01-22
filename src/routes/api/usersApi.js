const express = require('express');
const router = express.Router();
const apiUsersController = require('../../controllers/apiController/apiUsersController')

router.get('/', apiUsersController.listar);
router.get('/:id', apiUsersController.detalle);

module.exports = router;