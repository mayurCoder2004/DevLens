const express = require("express");

const {
    generateRepositoryReview,
    getRepositoryReview,
    refreshRepositoryReview,
} = require("../controllers/aiReview.controller");

const router = express.Router();

router.post(
    "/repositories/:repositoryId/ai-review",
    generateRepositoryReview
);

router.put(
    "/repositories/:repositoryId/ai-review",
    refreshRepositoryReview
);

router.get(
    "/repositories/:repositoryId/ai-review",
    getRepositoryReview
);

module.exports = router;