const prisma = require("../config/prisma");

const getHealthSummary = async (userId) => {
  const healthReports = await prisma.repositoryHealth.findMany({
    where: {
      repository: {
        userId,
      },
    },
    include: {
      repository: true,
    },
  });

  if (!healthReports.length) {
    return {
      averageHealthScore: 0,
      totalRepositories: 0,
      healthyRepositories: 0,
      needsAttention: 0,
      bestRepository: null,
      worstRepository: null,
    };
  }

  const totalScore = healthReports.reduce(
    (sum, report) => sum + report.healthScore,
    0,
  );

  const averageHealthScore = Math.round(totalScore / healthReports.length);

  const bestRepository = healthReports.reduce((best, current) =>
    current.healthScore > best.healthScore ? current : best,
  );

  const worstRepository = healthReports.reduce((worst, current) =>
    current.healthScore < worst.healthScore ? current : worst,
  );

  const healthyRepositories = healthReports.filter(
    (report) => report.healthScore >= 70,
  ).length;

  const needsAttention = healthReports.filter(
    (report) => report.healthScore < 50,
  ).length;

  return {
    averageHealthScore,
    totalRepositories: healthReports.length,

    healthyRepositories,
    needsAttention,

    bestRepository: {
      name: bestRepository.repository.name,
      healthScore: bestRepository.healthScore,
    },

    worstRepository: {
      name: worstRepository.repository.name,
      healthScore: worstRepository.healthScore,
    },
  };
};

module.exports = {
  getHealthSummary,
};
