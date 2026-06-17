const prisma = require("../config/prisma");

const getActivitySummary = async (userId) => {
  const analytics = await prisma.repositoryAnalytics.findMany({
    where: {
      repository: {
        userId,
      },
    },
    include: {
      repository: true,
    },
  });

  if (!analytics.length) {
    return {
      totalRepositories: 0,
      activeRepositories: 0,
      inactiveRepositories: 0,
      recentlyUpdatedRepositories: 0,
      mostActiveRepository: null,
      lastActivityDate: null,
    };
  }

  const today = new Date();

  let activeRepositories = 0;
  let recentlyUpdatedRepositories = 0;

  for (const repo of analytics) {
    if (!repo.lastCommitDate) {
      continue;
    }

    const daysSinceCommit = Math.floor(
      (today - new Date(repo.lastCommitDate)) / (1000 * 60 * 60 * 24),
    );

    if (daysSinceCommit <= 30) {
      activeRepositories++;
    }

    if (daysSinceCommit <= 7) {
      recentlyUpdatedRepositories++;
    }
  }

  const inactiveRepositories = analytics.length - activeRepositories;

  const mostActiveRepository = analytics.reduce((best, current) =>
    current.contributors > best.contributors ? current : best,
  );

  const lastActivity = analytics
    .filter((repo) => repo.lastCommitDate)
    .sort((a, b) => new Date(b.lastCommitDate) - new Date(a.lastCommitDate))[0];

  return {
    totalRepositories: analytics.length,

    activeRepositories,

    inactiveRepositories,

    recentlyUpdatedRepositories,

    mostActiveRepository: mostActiveRepository.repository.name,

    lastActivityDate: lastActivity?.lastCommitDate || null,
  };
};

module.exports = {
  getActivitySummary,
};
