const express = require("express");

const {
    generateRepositoryReview,
    getRepositoryReview,
} = require("../controllers/aiReview.controller");

const router = express.Router();

router.post(
    "/repositories/:repositoryId/ai-review",
    generateRepositoryReview
);

router.get(
    "/repositories/:repositoryId/ai-review",
    getRepositoryReview
);

module.exports = router;