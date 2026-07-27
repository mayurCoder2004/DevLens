const prisma = require("../config/prisma");
const technicalDebtService = require("../services/technicalDebt/technicalDebt.service");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// ============================
// Analyze Technical Debt
// ============================

const analyze = asyncHandler(async (req, res) => {
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

  const user = await prisma.user.findUnique({
    where: {
      id: repository.userId,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const report = await technicalDebtService.analyzeTechnicalDebt(
    repository.owner,
    repository.name,
    user.githubToken
  );

  await technicalDebtService.saveTechnicalDebt(repositoryId, report);

  return res.status(200).json({
    success: true,
    data: report,
  });
});

// ============================
// Get Technical Debt
// ============================

const getByRepository = asyncHandler(async (req, res) => {
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

  const debt = await prisma.repositoryTechnicalDebt.findUnique({
    where: {
      repositoryId,
    },
  });

  if (!debt) {
    throw new ApiError(404, "Technical debt analysis not found");
  }

  return res.status(200).json({
    success: true,
    data: debt,
  });
});

module.exports = {
  analyze,
  getByRepository,
};