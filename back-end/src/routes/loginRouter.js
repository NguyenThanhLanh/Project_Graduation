const express = require("express");
const router = express.Router();

const LoginController = require("../controllers/LoginController");

router.post("/", LoginController.HandleLogin);

module.exports = router;
