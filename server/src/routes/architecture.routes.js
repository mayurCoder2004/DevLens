const express = require("express");

const {
  testScanner,
} = require("../controllers/architecture.controller");

const router = express.Router();

router.get("/test", testScanner);

module.exports = router;