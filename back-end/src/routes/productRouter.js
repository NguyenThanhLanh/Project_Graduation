const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');

router.delete('/:id', ProductController.DeleteProduct);
router.put('/:id', ProductController.UpdateProduct);
router.get('/:id', ProductController.GetProductById);
router.post('/', ProductController.AddNewProduct)
router.get('/', ProductController.GetAllProducts);

module.exports = router;

