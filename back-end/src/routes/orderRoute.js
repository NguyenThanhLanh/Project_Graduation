const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/authv2");
const OrderController = require("../controllers/OrderController");

router.post("/create-order", isAuthenticated, OrderController.AddNewOrder);
router.delete("/:id", isAuthenticated, isAdmin, OrderController.DeleteOrder);
router.put("/:id", isAuthenticated, OrderController.UpdateOrder);
router.get("/:id", isAuthenticated, OrderController.GetOrderById);
router.get("/", isAuthenticated, OrderController.GetAllOrder);

module.exports = router;
