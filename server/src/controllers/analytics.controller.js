const prisma = require("../config/prisma");
const analyticsService = require("../services/analytics.service");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// ============================
// Test Analytics
// ============================

const test = asyncHandler(async (req, res) => {
  const { repositoryId } = req.validatedData.params;

  const repository = await prisma.repository.findFirst({
    where: {
      id: repositoryId,
      userId: req.user.userId,
    },
    include: {
      user: true,
    },
  });

  if (!repository) {
    throw new ApiError(404, "Repository not found");
  }

  const analytics = await analyticsService.getRepositoryAnalytics(
    repository,
    repository.user.githubToken
  );

  return res.status(200).json(analytics);
});

// ============================
// Analyze Repository
// ============================

const analyzeRepository = asyncHandler(async (req, res) => {
  const { repositoryId } = req.validatedData.params;

  const repository = await prisma.repository.findFirst({
    where: {
      id: repositoryId,
      userId: req.user.userId,
    },
    include: {
      user: true,
    },
  });

  if (!repository) {
    throw new ApiError(404, "Repository not found");
  }

  const analytics = await analyticsService.getRepositoryAnalytics(
    repository,
    repository.user.githubToken
  );

  const saved = await prisma.repositoryAnalytics.upsert({
    where: {
      repositoryId,
    },
    update: analytics,
    create: {
      repositoryId,
      ...analytics,
    },
  });

  return res.status(200).json({
    success: true,
    analytics: saved,
  });
});

// ============================
// Get Analytics
// ============================

const getAnalytics = asyncHandler(async (req, res) => {
  const { repositoryId } = req.validatedData.params;

  const repository = await prisma.repository.findFirst({
    where: {
      id: repositoryId,
      userId: req.user.userId,
    },
  });

  if (!repository) {
    throw new ApiError(404, "Repository not found");
  }

  const analytics = await prisma.repositoryAnalytics.findUnique({
    where: {
      repositoryId,
    },
  });

  if (!analytics) {
    throw new ApiError(404, "Repository analytics not found");
  }

  return res.status(200).json({
    success: true,
    analytics,
  });
});

module.exports = {
  test,
  analyzeRepository,
  getAnalytics,
};