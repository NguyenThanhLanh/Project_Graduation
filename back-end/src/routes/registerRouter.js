const express = require("express");
const router = express.Router();
const { upload } = require("../../multer");

const RegisterController = require("../controllers/RegisterController");

router.post("/", upload.single("avatar"), RegisterController.AddNewUser);

module.exports = router;
