const prisma = require("../config/prisma");

const getPortfolioInsights = async (userId) => {
  const repositories = await prisma.repository.findMany({
    where: {
      userId,
    },
  });

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

  const techStacks = await prisma.repositoryTechStack.findMany({
    where: {
      repository: {
        userId,
      },
    },
  });

  const languageCount = {};
  const technologyCount = {};

  for (const repo of repositories) {
    if (!repo.language) continue;

    languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
  }

  for (const stack of techStacks) {
    const technologies = stack.technologies || [];

    for (const tech of technologies) {
      technologyCount[tech] = (technologyCount[tech] || 0) + 1;
    }
  }

  const topLanguage =
    Object.entries(languageCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  const sortedTechnologies = Object.entries(technologyCount).sort(
    (a, b) => b[1] - a[1],
  );

  const topTechnology = sortedTechnologies[0]?.[0] || null;

  const mostUsedStack = sortedTechnologies.slice(0, 3).map(([tech]) => tech);

  const averageHealthScore = healthReports.length
    ? Math.round(
        healthReports.reduce((sum, report) => sum + report.healthScore, 0) /
          healthReports.length,
      )
    : 0;

  const bestRepository = healthReports.length
    ? healthReports.reduce((best, current) =>
        current.healthScore > best.healthScore ? current : best,
      )
    : null;

  return {
    totalRepositories: repositories.length,

    averageHealthScore,

    topLanguage,

    topTechnology,

    mostUsedStack,

    bestRepository: bestRepository
      ? {
          name: bestRepository.repository.name,
          healthScore: bestRepository.healthScore,
        }
      : null,
  };
};

module.exports = {
  getPortfolioInsights,
};
