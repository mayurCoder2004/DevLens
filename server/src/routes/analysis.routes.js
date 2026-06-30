const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const analysisController = require("../controllers/analysis.controller");

router.post(
  "/:repoId",
  authMiddleware,
  analysisController.analyzeRepository
);

module.exports = router;