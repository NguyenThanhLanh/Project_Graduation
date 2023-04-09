const express = require('express');
const router = express.Router();

const RegisterController = require('../controllers/RegisterController')

router.post('/', RegisterController.AddNewUser);

module.exports = router;
