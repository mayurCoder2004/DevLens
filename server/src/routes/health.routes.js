const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");

const {
  analyzeRepositoryHealth,
  getRepositoryHealth,
} = require("../controllers/health.controller");
const { analyzeAllHealth } = require("../controllers/bulkHealth.controller");
const { getSummary } = require("../controllers/healthSummary.controller");

const router = express.Router();

router.post("/analyze-all", authMiddleware, analyzeAllHealth);

router.get("/summary", authMiddleware, getSummary);

router.post("/:repositoryId", authMiddleware, analyzeRepositoryHealth);

router.get("/:repositoryId", authMiddleware, getRepositoryHealth);

module.exports = router;
