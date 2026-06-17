const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");

const { getInsights } = require("../controllers/portfolioInsights.controller");

const router = express.Router();

router.get("/insights", authMiddleware, getInsights);

module.exports = router;
