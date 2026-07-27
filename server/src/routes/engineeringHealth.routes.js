const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
  repositoryIdSchema,
} = require("../validations/repository.validation");

const {
  getEngineeringHealth,
} = require("../controllers/engineeringHealth.controller");

router.get(
  "/:repositoryId",
  authMiddleware,
  validate(repositoryIdSchema),
  getEngineeringHealth
);

module.exports = router;