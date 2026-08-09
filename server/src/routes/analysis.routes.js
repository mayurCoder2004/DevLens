const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const { repositoryIdSchema } = require("../validations/repository.validation");

const analysisController = require("../controllers/analysis.controller");

router.post(
  "/:repositoryId",
  authMiddleware,
  validate(repositoryIdSchema),
  analysisController.analyzeRepository,
);

module.exports = router;
