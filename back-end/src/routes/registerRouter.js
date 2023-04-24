const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { upload } = require("../../multer");

const RegisterController = require("../controllers/RegisterController");

router.post(
  "/",
  upload.single("avatar"),
  catchAsyncErrors(RegisterController.AddNewUser)
);

module.exports = router;
