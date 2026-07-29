const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
  pullRequestSchema,
  repositoryIdSchema,
} = require("../validations/repository.validation");

const {
  analyzePullRequestController,
  getPullRequestAnalysis,
  getRepositoryPullRequests,
} = require("../controllers/pullRequest.controller");

router.post(
  "/analyze/:repositoryId/:prNumber",
  authMiddleware,
  validate(pullRequestSchema),
  analyzePullRequestController
);

router.get(
  "/:repositoryId/:prNumber",
  authMiddleware,
  validate(pullRequestSchema),
  getPullRequestAnalysis
);

router.get(
  "/:repositoryId",
  authMiddleware,
  validate(repositoryIdSchema),
  getRepositoryPullRequests
);

module.exports = router;