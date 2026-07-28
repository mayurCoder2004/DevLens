const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");

const {
  getSummary,
  getRecentActivities,
} = require("../controllers/activity.controller");

const router = express.Router();

router.get("/summary", authMiddleware, getSummary);

router.get("/", authMiddleware, getRecentActivities);

module.exports = router;