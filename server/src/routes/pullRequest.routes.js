const express = require("express");

const {
  analyzePullRequestController,
  getPullRequestAnalysis,
} = require("../controllers/pullRequest.controller");

const router = express.Router();

router.post("/analyze/:repositoryId/:prNumber", analyzePullRequestController);

router.get("/:repositoryId/:prNumber", getPullRequestAnalysis);

module.exports = router;
