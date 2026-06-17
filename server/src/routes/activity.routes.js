const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");

const { getSummary } = require("../controllers/activity.controller");

const router = express.Router();

router.get("/summary", authMiddleware, getSummary);

module.exports = router;
