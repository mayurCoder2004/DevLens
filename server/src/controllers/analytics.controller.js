const prisma = require("../config/prisma");
const analyticsService = require("../services/analytics.service");

exports.test = async (req, res) => {

  try {

    const repo = await prisma.repository.findUnique({
      where: {
        id: req.params.repoId
      },
      include: {
        user: true
      }
    });

    if (!repo) {
      return res.status(404).json({
        message: "Repository not found"
      });
    }

    const analytics =
      await analyticsService.getRepositoryAnalytics(
        repo,
        repo.user.githubToken
      );

    return res.json(analytics);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: error.message
    });
  }

};