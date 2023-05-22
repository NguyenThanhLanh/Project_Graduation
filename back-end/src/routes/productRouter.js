const express = require("express");
const router = express.Router();
const { upload } = require("../../multer");
const { isAuthenticated, isAdmin } = require("../middleware/authv2");

const ProductController = require("../controllers/ProductController");

router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  ProductController.DeleteProduct
);
router.put("/:id", isAuthenticated, isAdmin, ProductController.UpdateProduct);
router.get("/:id", ProductController.GetProductById);
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  ProductController.AddNewProduct
);
router.get("/", ProductController.GetAllProducts);

module.exports = router;
