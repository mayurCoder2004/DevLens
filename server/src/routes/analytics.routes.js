const express = require("express");

const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");

router.get("/test/:repoId", analyticsController.test);

module.exports = router;
