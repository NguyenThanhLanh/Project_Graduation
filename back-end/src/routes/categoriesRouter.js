const express = require("express");
const router = express.Router();
const CategoriesController = require("../controllers/CategoriesController");
const { isAuthenticated, isAdmin } = require("../middleware/authv2");
const { upload } = require("../../multer");

router.get("/", CategoriesController.GetAllCategory);
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  CategoriesController.AddCategory
);
router.put("/:id", isAuthenticated, CategoriesController.UpdateCategory);
router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  CategoriesController.DeleteCategory
);

module.exports = router;
