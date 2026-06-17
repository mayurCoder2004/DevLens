const prisma = require("../config/prisma");

const analyticsService = require("../services/analytics.service");

const {
  generateRepositoryHealth,
} = require("../services/repositoryHealth.service");

const analyzeRepositoryHealth = async (req, res) => {
  try {
    const { repositoryId } = req.params;

    const repository = await prisma.repository.findUnique({
      where: {
        id: repositoryId,
      },
    });

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: repository.userId,
      },
    });

    let analytics =
      await prisma.repositoryAnalytics.findUnique({
        where: {
          repositoryId: repository.id,
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
            repositoryId: repository.id,
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

    const health =
      await prisma.repositoryHealth.upsert({
        where: {
          repositoryId: repository.id,
        },
        update: report,
        create: {
          repositoryId: repository.id,
          ...report,
        },
      });

    return res.json({
      success: true,
      data: health,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRepositoryHealth = async (
  req,
  res
) => {
  try {
    const health =
      await prisma.repositoryHealth.findUnique({
        where: {
          repositoryId:
            req.params.repositoryId,
        },
      });

    if (!health) {
      return res.status(404).json({
        success: false,
        message:
          "Health report not found",
      });
    }

    return res.json({
      success: true,
      data: health,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch health report",
    });
  }
};

module.exports = {
  analyzeRepositoryHealth,
  getRepositoryHealth
};