const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
  repositoryIdSchema,
} = require("../validations/repository.validation");

const {
  analyzeDeployment,
  getDeploymentReport,
} = require("../controllers/deployment.controller");

router.post(
  "/:repositoryId/analyze",
  authMiddleware,
  validate(repositoryIdSchema),
  analyzeDeployment
);

router.get(
  "/:repositoryId",
  authMiddleware,
  validate(repositoryIdSchema),
  getDeploymentReport
);

module.exports = router;