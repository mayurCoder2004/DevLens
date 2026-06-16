const prisma = require("../config/prisma");
const analyticsService = require("../services/analytics.service");

exports.test = async (req, res) => {
  try {
    const repo = await prisma.repository.findUnique({
      where: {
        id: req.params.repoId,
      },
      include: {
        user: true,
      },
    });

    if (!repo) {
      return res.status(404).json({
        message: "Repository not found",
      });
    }

    const analytics = await analyticsService.getRepositoryAnalytics(
      repo,
      repo.user.githubToken,
    );

    return res.json(analytics);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.analyzeRepository = async (req, res) => {
  try {
    const repoId = req.params.repoId;

    const repository = await prisma.repository.findUnique({
      where: {
        id: repoId,
      },
      include: {
        user: true,
      },
    });

    if (!repository) {
      return res.status(404).json({
        message: "Repository not found",
      });
    }

    const analytics = await analyticsService.getRepositoryAnalytics(
      repository,
      repository.user.githubToken,
    );

    const saved = await prisma.repositoryAnalytics.upsert({
      where: {
        repositoryId: repository.id,
      },
      update: analytics,
      create: {
        repositoryId: repository.id,
        ...analytics,
      },
    });

    return res.json(saved);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAnalytics = async (req, res) => {
  const analytics = await prisma.repositoryAnalytics.findUnique({
    where: {
      repositoryId: req.params.repoId,
    },
  });

  return res.json(analytics);
};
