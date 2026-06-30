const express = require("express");

const router = express.Router();

const deploymentController = require("../controllers/deployment.controller.js");

router.post("/:id/analyze", deploymentController.analyzeDeployment);

router.get("/:id", deploymentController.getDeploymentReport);

module.exports = router;
