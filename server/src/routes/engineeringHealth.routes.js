const express = require("express");

const engineeringHealthController = require("../controllers/engineeringHealth.controller");

const router = express.Router();

router.get("/:repositoryId", engineeringHealthController.getEngineeringHealth);

module.exports = router;
