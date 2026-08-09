const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const { repositoryIdSchema } = require("../validations/repository.validation");

const analyticsController = require("../controllers/analytics.controller");

router.get(
  "/test/:repositoryId",
  authMiddleware,
  validate(repositoryIdSchema),
  analyticsController.test,
);

router.post(
  "/:repositoryId",
  authMiddleware,
  validate(repositoryIdSchema),
  analyticsController.analyzeRepository,
);

router.get(
  "/:repositoryId",
  authMiddleware,
  validate(repositoryIdSchema),
  analyticsController.getAnalytics,
);

module.exports = router;
