const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");

const { getInsights } = require("../controllers/portfolioInsights.controller");
const {
  getRecommendations,
} = require("../controllers/portfolioRecommendations.controller");

const router = express.Router();

router.get("/insights", authMiddleware, getInsights);

router.get("/recommendations", authMiddleware, getRecommendations);

module.exports = router;
