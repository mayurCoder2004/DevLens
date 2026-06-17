const prisma = require("../config/prisma");

const getPortfolioRecommendations = async (userId) => {
  const healthReports = await prisma.repositoryHealth.findMany({
    where: {
      repository: {
        userId,
      },
    },
  });

  if (!healthReports.length) {
    return [];
  }

  const recommendations = [];

  const averageHealthScore = Math.round(
    healthReports.reduce((sum, report) => sum + report.healthScore, 0) /
      healthReports.length,
  );

  const needsAttention = healthReports.filter(
    (report) => report.healthScore < 50,
  ).length;

  const lowDocumentation = healthReports.filter(
    (report) => report.documentationScore < 50,
  ).length;

  const lowOpenSource = healthReports.filter(
    (report) => report.openSourceScore < 50,
  ).length;

  if (averageHealthScore < 60) {
    recommendations.push(
      `Average health score is ${averageHealthScore}. Focus on improving repository quality.`,
    );
  }

  if (needsAttention > 0) {
    recommendations.push(
      `${needsAttention} repositories need immediate attention.`,
    );
  }

  if (lowDocumentation > healthReports.length / 2) {
    recommendations.push(
      "Documentation quality is low across much of the portfolio.",
    );
  }

  if (lowOpenSource > healthReports.length / 2) {
    recommendations.push(
      "Many repositories are missing open-source essentials such as LICENSE or CONTRIBUTING files.",
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Portfolio health looks strong. Continue maintaining repository quality.",
    );
  }

  return recommendations;
};

module.exports = {
  getPortfolioRecommendations,
};
