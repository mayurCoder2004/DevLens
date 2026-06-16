const express = require("express");

const router = express.Router();

const techStackController = require("../controllers/techStack.controller");

router.post("/:repoId", techStackController.analyzeTechStack);

router.get("/:repoId", techStackController.getTechStack);

module.exports = router;
