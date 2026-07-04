const prisma = require("../config/prisma");

const savePullRequestAnalysis = async ({
  repositoryId,
  prNumber,
  title,
  analysis,
}) => {
  const analysisData = {
    title,

    // Risk Analysis
    riskScore: analysis.risk.score,
    riskLevel: analysis.risk.level,
    riskBreakdown: analysis.risk.breakdown,

    // Pull Request Statistics
    totalFiles: analysis.summary.totalFiles,
    additions: analysis.summary.additions,
    deletions: analysis.summary.deletions,
    totalChanges: analysis.summary.totalChanges,

    // File Analysis
    changedFiles: analysis.files,
    criticalFiles: analysis.classification.categories.critical,

    // Flags
    hasDependencyChanges:
      analysis.classification.summary.dependencyCount > 0,

    hasConfigurationChanges:
      analysis.classification.summary.infrastructureCount > 0,

    // Recommendations
    recommendations: analysis.recommendations,
  };

  return prisma.pullRequestAnalysis.upsert({
    where: {
      repositoryId_prNumber: {
        repositoryId,
        prNumber,
      },
    },

    update: analysisData,

    create: {
      repositoryId,
      prNumber,
      ...analysisData,
    },
  });
};

module.exports = {
  savePullRequestAnalysis,
};