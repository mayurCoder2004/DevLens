const express = require("express");

const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");

router.get("/test/:repoId", analyticsController.test);

router.post("/:repoId", analyticsController.analyzeRepository);

router.get("/:repoId", analyticsController.getAnalytics);

module.exports = router;
