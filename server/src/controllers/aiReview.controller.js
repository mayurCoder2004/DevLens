const prisma = require("../config/prisma");

const AIReviewService = require("../services/ai/aiReview.service");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const aiReviewService = new AIReviewService();

// ============================
// Generate AI Review
// ============================

const generateRepositoryReview = asyncHandler(async (req, res) => {
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

  const review = await aiReviewService.generateRepositoryReview(repositoryId);

  return res.status(200).json({
    success: true,
    message: "AI repository review generated successfully.",
    data: review,
  });
});

// ============================
// Get AI Review
// ============================

const getRepositoryReview = asyncHandler(async (req, res) => {
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

  const review = await aiReviewService.getRepositoryReview(repositoryId);

  if (!review) {
    throw new ApiError(404, "AI review not found");
  }

  return res.status(200).json({
    success: true,
    data: review,
  });
});

// ============================
// Refresh AI Review
// ============================

const refreshRepositoryReview = asyncHandler(async (req, res) => {
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

  const review = await aiReviewService.refreshRepositoryReview(repositoryId);

  return res.status(200).json({
    success: true,
    message: "AI repository review refreshed successfully.",
    data: review,
  });
});

module.exports = {
  generateRepositoryReview,
  getRepositoryReview,
  refreshRepositoryReview,
};
