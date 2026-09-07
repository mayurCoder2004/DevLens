const prisma = require("../../config/prisma");

const createChangeImpactAnalysis = async ({
  pullRequestAnalysisId,
  impact,
}) => {
  if (!pullRequestAnalysisId) {
    throw new Error(
      "pullRequestAnalysisId is required",
    );
  }

  if (!impact) {
    throw new Error(
      "impact analysis is required",
    );
  }

  return prisma.changeImpactAnalysis.upsert({
    where: {
      pullRequestAnalysisId,
    },

    create: {
      pullRequestAnalysisId,

      score: impact.score,
      level: impact.level,

      breakdown: impact.breakdown,
      metrics: impact.metrics,

      affectedFiles: impact.affectedFiles,
      criticalAffectedFiles:
        impact.criticalAffectedFiles,

      affectedAreas: impact.affectedAreas,
      recommendations: impact.recommendations,

      unresolvedFiles: impact.unresolvedFiles,
    },

    update: {
      score: impact.score,
      level: impact.level,

      breakdown: impact.breakdown,
      metrics: impact.metrics,

      affectedFiles: impact.affectedFiles,
      criticalAffectedFiles:
        impact.criticalAffectedFiles,

      affectedAreas: impact.affectedAreas,
      recommendations: impact.recommendations,

      unresolvedFiles: impact.unresolvedFiles,
    },
  });
};

const getChangeImpactAnalysis = async (
  pullRequestAnalysisId,
) => {
  if (!pullRequestAnalysisId) {
    throw new Error(
      "pullRequestAnalysisId is required",
    );
  }

  return prisma.changeImpactAnalysis.findUnique({
    where: {
      pullRequestAnalysisId,
    },
  });
};

module.exports = {
  createChangeImpactAnalysis,
  getChangeImpactAnalysis,
};
