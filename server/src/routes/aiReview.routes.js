const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
  repositoryIdSchema,
} = require("../validations/repository.validation");

const {
  generateRepositoryReview,
  getRepositoryReview,
  refreshRepositoryReview,
} = require("../controllers/aiReview.controller");

router.post(
  "/repositories/:repositoryId/ai-review",
  authMiddleware,
  validate(repositoryIdSchema),
  generateRepositoryReview
);

router.put(
  "/repositories/:repositoryId/ai-review",
  authMiddleware,
  validate(repositoryIdSchema),
  refreshRepositoryReview
);

router.get(
  "/repositories/:repositoryId/ai-review",
  authMiddleware,
  validate(repositoryIdSchema),
  getRepositoryReview
);

module.exports = router;