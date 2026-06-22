const express = require("express");

const {
  analyzeRepositoryArchitecture,
  getRepositoryArchitecture,
} = require("../controllers/architecture.controller");

const router = express.Router();

router.post("/analyze/:repositoryId", analyzeRepositoryArchitecture);
router.get("/:repositoryId", getRepositoryArchitecture);

module.exports = router;
