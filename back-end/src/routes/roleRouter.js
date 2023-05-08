const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/RoleController");
const { isAuthenticated, isAdmin } = require("../middleware/authv2");

router.delete("/:id", isAuthenticated, isAdmin, RoleController.DeleteRole);
router.put("/:id", isAuthenticated, isAdmin, RoleController.UpdateRole);
router.get("/:id", RoleController.GetRoleById);
router.post("/", isAuthenticated, isAdmin, RoleController.AddNewRole);
router.get("/", RoleController.GetAllRole);

module.exports = router;
