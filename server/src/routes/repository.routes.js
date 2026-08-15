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
  getRepositorySnapshots,
  getRepositoryChanges,
} = require("../controllers/repository.controller");

// ============================
// Sync GitHub Repositories
// ============================

router.post(
  "/sync",
  authMiddleware,
  syncRepositories,
);

// ============================
// Get User Repositories
// ============================

router.get(
  "/",
  authMiddleware,
  getUserRepositories,
);

// ============================
// Get Repository Snapshot History
// ============================

router.get(
  "/:repositoryId/snapshots",
  authMiddleware,
  validate(repositoryIdSchema),
  getRepositorySnapshots,
);

// ============================
// Get Repository Changes
// ============================

router.get(
  "/:repositoryId/changes",
  authMiddleware,
  validate(repositoryIdSchema),
  getRepositoryChanges,
);

// ============================
// Get Repository By ID
// ============================

router.get(
  "/:repositoryId",
  authMiddleware,
  validate(repositoryIdSchema),
  getRepositoryById,
);

// ============================
// Get Repository Architecture
// ============================

router.get(
  "/:repositoryId/architecture",
  authMiddleware,
  validate(repositoryIdSchema),
  getRepositoryArchitecture,
);

module.exports = router;