const express = require('express');
const router = express.Router();
const SuppilerController = require('../controllers/SuppilerController');

router.delete('/:id', SuppilerController.DeleteSuppiler);
router.put('/:id', SuppilerController.UpdateSuppiler);
router.get('/:id', SuppilerController.GetSuppilerById);
router.post('/', SuppilerController.AddNewSuppiler);
router.get('/', SuppilerController.GetAllSuppilers);

module.exports = router;