const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');

router.use('/:id/:test', ProductController.getProductByID);
router.use('/', ProductController.getAllProducts);

module.exports = router;

