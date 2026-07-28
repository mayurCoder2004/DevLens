const prisma = require("../../config/prisma");

const average = (values) => {
  if (!values.length) return 0;

  return Math.round(
    values.reduce((sum, value) => sum + value, 0) / values.length
  );
};

const getEngineeringStatus = (score) => {
  if (score >= 90) return "Outstanding";
  if (score >= 80) return "Excellent Health";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  return "Needs Attention";
};

const getDeploymentStatus = (score) => {
  if (score >= 90) return "Production Ready";
  if (score >= 75) return "Almost Ready";
  if (score >= 60) return "Needs Improvement";
  return "Not Ready";
};

const getDashboardOverview = async (userId) => {
  const [
    engineeringHealth,
    technicalDebt,
    deployment,
    aiReviews,
  ] = await Promise.all([
    prisma.repositoryHealth.findMany({
      where: {
        repository: {
          userId,
        },
      },
      select: {
        healthScore: true,
      },
    }),

    prisma.repositoryTechnicalDebt.findMany({
      where: {
        repository: {
          userId,
        },
      },
      select: {
        maintainabilityScore: true,
      },
    }),

    prisma.repositoryDeployment.findMany({
      where: {
        repository: {
          userId,
        },
      },
      select: {
        deploymentScore: true,
      },
    }),

    prisma.repositoryAIReview.count({
      where: {
        repository: {
          userId,
        },
      },
    }),
  ]);

  const engineeringScore = average(
    engineeringHealth.map((item) => item.healthScore)
  );

  const maintainabilityScore = average(
    technicalDebt.map((item) => item.maintainabilityScore)
  );

  const deploymentScore = average(
    deployment.map((item) => item.deploymentScore)
  );

  return {
    engineeringHealth: {
      score: engineeringScore,
      scoreText: `${engineeringScore}%`,
      status: getEngineeringStatus(engineeringScore),
    },

    technicalDebt: {
      score: maintainabilityScore,
      scoreText: `${maintainabilityScore}%`,
      status:
        maintainabilityScore >= 80
          ? "Low Technical Debt"
          : "Needs Refactoring",
    },

    deployment: {
      score: deploymentScore,
      scoreText: `${deploymentScore}%`,
      status: getDeploymentStatus(deploymentScore),
    },

    aiReviews: {
      count: aiReviews,
      countText: aiReviews.toString(),
    },

    analyzedRepositories: engineeringHealth.length,
  };
};

module.exports = {
  getDashboardOverview,
};