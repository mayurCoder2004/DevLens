const express = require("express");

const router = express.Router();

const technicalDebtController = require("../controllers/technicalDebt.controller");

router.post("/analyze/:repositoryId", technicalDebtController.analyze);

router.get("/:repositoryId", technicalDebtController.getByRepository);

module.exports = router;
