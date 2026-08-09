const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const { repositoryIdSchema } = require("../validations/repository.validation");

const {
  analyze,
  getByRepository,
} = require("../controllers/technicalDebt.controller");

router.post(
  "/analyze/:repositoryId",
  authMiddleware,
  validate(repositoryIdSchema),
  analyze,
);

router.get(
  "/:repositoryId",
  authMiddleware,
  validate(repositoryIdSchema),
  getByRepository,
);

module.exports = router;
