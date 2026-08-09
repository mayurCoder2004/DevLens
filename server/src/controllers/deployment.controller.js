const prisma = require("../config/prisma");
const deploymentService = require("../services/deployment/deploymentService");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// ============================
// Analyze Deployment
// ============================

const analyzeDeployment = asyncHandler(async (req, res) => {
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

  const report = await deploymentService.analyzeRepositoryDeployment(
    repository,
    repository.user.githubToken,
  );

  return res.status(200).json({
    success: true,
    data: report,
  });
});

// ============================
// Get Deployment Report
// ============================

const getDeploymentReport = asyncHandler(async (req, res) => {
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

  const report = await prisma.repositoryDeployment.findUnique({
    where: {
      repositoryId,
    },
  });

  if (!report) {
    throw new ApiError(404, "Deployment report not found");
  }

  const formattedReport = {
    deploymentScore: report.deploymentScore,
    status: report.deploymentStatus,

    infrastructure: {
      score: report.infrastructureScore,
    },

    configuration: {
      score: report.configurationScore,
    },

    buildReadiness: {
      score: report.buildReadinessScore,
    },

    ciCd: {
      score: report.ciCdScore,
    },

    runtime: report.runtime,
    lockFiles: report.lockFiles,
    dockerQuality: report.dockerQuality,
    workflowQuality: report.workflowQuality,
    platforms: report.platforms,
    strengths: report.strengths,
    warnings: report.warnings,
    criticalIssues: report.criticalIssues,
    recommendations: report.recommendations,
  };

  return res.status(200).json({
    success: true,
    data: formattedReport,
  });
});

module.exports = {
  analyzeDeployment,
  getDeploymentReport,
};
