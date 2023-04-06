const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');

router.delete('/:id', RoleController.DeleteRole);
router.put('/:id', RoleController.UpdateRole);
router.get('/:id', RoleController.GetRoleById);
router.post('/', RoleController.AddNewRole);
router.get('/', RoleController.GetAllRole);

module.exports = router;