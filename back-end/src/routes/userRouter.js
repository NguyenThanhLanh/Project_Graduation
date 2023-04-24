const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const verifyAdminAuth = require("../middleware/verifyAdmin");
const UserController = require("../controllers/UserController");
const { isAuthenticated } = require("../middleware/authv2");

router.get("/load-user", isAuthenticated, UserController.LoadUser);
router.delete("/:id", verifyToken, verifyAdminAuth, UserController.DeleteUser);
router.put("/:id", UserController.UpdateUser);
router.get("/:id", UserController.GetUserById);
router.get("/", verifyToken, verifyAdminAuth, UserController.GetAllUser);

module.exports = router;
