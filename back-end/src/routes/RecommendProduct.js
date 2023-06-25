const express = require("express");
const router = express.Router();

const Recommendations = require("../controllers/Recommendations");

router.get("/:id", Recommendations.recommendProducts);

module.exports = router;
