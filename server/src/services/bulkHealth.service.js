const prisma = require("../config/prisma");

const analyticsService = require("./analytics.service");

const {
  generateRepositoryHealth,
} = require("./repositoryHealth.service");

const analyzeAllRepositories =
  async (userId) => {

    const user =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    const repositories =
      await prisma.repository.findMany({
        where: {
          userId,
        },
      });

    let analyzedCount = 0;

    for (const repository of repositories) {

      let analytics =
        await prisma.repositoryAnalytics.findUnique({
          where: {
            repositoryId:
              repository.id,
          },
        });

      if (!analytics) {
        const analyticsData =
          await analyticsService.getRepositoryAnalytics(
            repository,
            user.githubToken
          );

        analytics =
          await prisma.repositoryAnalytics.create({
            data: {
              repositoryId:
                repository.id,
              ...analyticsData,
            },
          });
      }

      const report =
        await generateRepositoryHealth(
          repository,
          analytics,
          user.githubToken
        );

      await prisma.repositoryHealth.upsert({
        where: {
          repositoryId:
            repository.id,
        },
        update: report,
        create: {
          repositoryId:
            repository.id,
          ...report,
        },
      });

      analyzedCount++;
    }

    return {
      totalRepositories:
        repositories.length,
      analyzedCount,
    };
  };

module.exports = {
  analyzeAllRepositories,
};