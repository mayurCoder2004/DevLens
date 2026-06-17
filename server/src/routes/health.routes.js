const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");

const { analyzeRepositoryHealth, getRepositoryHealth } = require("../controllers/health.controller");

const router = express.Router();

router.post("/:repositoryId", authMiddleware, analyzeRepositoryHealth);

router.get("/:repositoryId", authMiddleware, getRepositoryHealth);

module.exports = router;
