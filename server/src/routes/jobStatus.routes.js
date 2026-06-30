const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const jobStatusController = require("../controllers/jobStatus.controller");

router.get("/:jobId", authMiddleware, jobStatusController.getJobStatus);

module.exports = router;
