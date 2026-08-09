const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const dashboardController = require("../controllers/dashboard.controller");

router.get(
  "/overview",
  authMiddleware,
  dashboardController.getDashboardOverview,
);

router.get(
  "/attention",
  authMiddleware,
  dashboardController.getRepositoriesNeedingAttention,
);

module.exports = router;
