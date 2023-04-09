const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.delete('/:id', UserController.DeleteUser);
router.put('/:id', UserController.UpdateUser);
router.get('/:id', UserController.GetUserById);
// router.post('/', UserController.AddNewUser);
router.get('/', UserController.GetAllUser);

module.exports = router;