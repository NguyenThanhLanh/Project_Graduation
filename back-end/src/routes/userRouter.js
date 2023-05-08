const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const verifyAdminAuth = require("../middleware/verifyAdmin");
const UserController = require("../controllers/UserController");
const { isAuthenticated, isAdmin } = require("../middleware/authv2");

router.get("/load-user", isAuthenticated, UserController.LoadUser);
router.delete("/:id", isAuthenticated, isAdmin, UserController.DeleteUser);
router.put("/:id", isAuthenticated, isAdmin, UserController.UpdateUser);
router.get("/:id", isAuthenticated, UserController.GetUserById);
router.get("/", isAuthenticated, isAdmin, UserController.GetAllUser);

module.exports = router;
