const express = require("express");
const router = express.Router();
const author = require("../middleware/auth");

const LoginController = require("../controllers/LoginController");

router.post("/", LoginController.HandleLogin);
// router.post('/', author); bỏ
// router.get('/', author) bỏ

module.exports = router;
