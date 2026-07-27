const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
  repositoryIdSchema,
} = require("../validations/repository.validation");

const {
  syncRepositories,
  getUserRepositories,
  getRepositoryById,
  getRepositoryArchitecture,
} = require("../controllers/repository.controller");

// ============================
// Sync GitHub Repositories
// ============================

router.post("/sync", authMiddleware, syncRepositories);

// ============================
// Get User Repositories
// ============================

router.get("/", authMiddleware, getUserRepositories);

// ============================
// Get Repository By ID
// ============================

router.get(
  "/:id",
  authMiddleware,
  validate(repositoryIdSchema),
  getRepositoryById
);

// ============================
// Get Repository Architecture
// ============================

router.get(
  "/:id/architecture",
  authMiddleware,
  validate(repositoryIdSchema),
  getRepositoryArchitecture
);

module.exports = router;