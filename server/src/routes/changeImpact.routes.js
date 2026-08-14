const express = require("express");

const {
  getChangeImpact,
} = require("../controllers/changeImpact.controller");

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const repositoryAccessMiddleware =
  require("../middleware/repositoryAccess.middleware");

const {
  changeImpactParamsSchema,
} = require("../validations/changeImpact.validator");

const router = express.Router();

router.get(
  "/:repositoryId/:prNumber",

  authMiddleware,

  validate({
    params: changeImpactParamsSchema,
  }),

  repositoryAccessMiddleware,

  getChangeImpact,
);

module.exports = router;