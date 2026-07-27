const express = require("express");

const router = express.Router();

const {
  loginAsTestUser,
} = require("../controllers/testAuth.controller");

router.post("/login", loginAsTestUser);

module.exports = router;