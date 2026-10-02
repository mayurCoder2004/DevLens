const express = require("express");

const {
  analyzePublicRepository,
} = require("../controllers/repositoryGraph.controller");

const router = express.Router();

router.post("/analyze", analyzePublicRepository);

module.exports = router;
