const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  syncRepositories,
  getUserRepositories,
} = require("../controllers/repository.controller");

router.post("/sync", authMiddleware, syncRepositories);

router.get("/", authMiddleware, getUserRepositories);

module.exports = router;
