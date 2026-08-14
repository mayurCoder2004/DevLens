const prisma = require("../../config/prisma");

const getChangeImpactForPullRequest = async ({
  repositoryId,
  prNumber,
}) => {
  if (!repositoryId) {
    throw new Error("repositoryId is required");
  }

  if (!prNumber) {
    throw new Error("prNumber is required");
  }

  const pullRequestAnalysis =
    await prisma.pullRequestAnalysis.findUnique({
      where: {
        repositoryId_prNumber: {
          repositoryId,
          prNumber: Number(prNumber),
        },
      },
      include: {
        changeImpact: true,
      },
    });

  if (!pullRequestAnalysis) {
    return null;
  }

  if (!pullRequestAnalysis.changeImpact) {
    return {
      pullRequest: {
        id: pullRequestAnalysis.id,
        number: pullRequestAnalysis.prNumber,
        title: pullRequestAnalysis.title,
        riskScore: pullRequestAnalysis.riskScore,
        riskLevel: pullRequestAnalysis.riskLevel,
      },
      changeImpact: null,
    };
  }

  return {
    pullRequest: {
      id: pullRequestAnalysis.id,
      number: pullRequestAnalysis.prNumber,
      title: pullRequestAnalysis.title,
      riskScore: pullRequestAnalysis.riskScore,
      riskLevel: pullRequestAnalysis.riskLevel,
    },

    changeImpact: {
      id: pullRequestAnalysis.changeImpact.id,

      score: pullRequestAnalysis.changeImpact.score,
      level: pullRequestAnalysis.changeImpact.level,

      breakdown:
        pullRequestAnalysis.changeImpact.breakdown,

      metrics:
        pullRequestAnalysis.changeImpact.metrics,

      affectedFiles:
        pullRequestAnalysis.changeImpact.affectedFiles,

      criticalAffectedFiles:
        pullRequestAnalysis.changeImpact.criticalAffectedFiles,

      affectedAreas:
        pullRequestAnalysis.changeImpact.affectedAreas,

      recommendations:
        pullRequestAnalysis.changeImpact.recommendations,

      unresolvedFiles:
        pullRequestAnalysis.changeImpact.unresolvedFiles,

      createdAt:
        pullRequestAnalysis.changeImpact.createdAt,

      updatedAt:
        pullRequestAnalysis.changeImpact.updatedAt,
    },
  };
};

module.exports = {
  getChangeImpactForPullRequest,
};