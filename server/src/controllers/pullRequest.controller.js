const prisma = require("../config/prisma");

const {
  analyzePullRequest,
} = require("../services/pullRequestAnalysis.service");

const {
  savePullRequestAnalysis,
} = require("../services/pullRequestPersistence.service");

const analyzePullRequestController = async (req, res) => {
  try {
    const { repositoryId, prNumber } = req.params;

const prNumberInt = Number(prNumber);

if (Number.isNaN(prNumberInt)) {
  return res.status(400).json({
    success: false,
    message: "Invalid pull request number.",
  });
}

    const repository = await prisma.repository.findUnique({
      where: {
        id: repositoryId,
      },
      include: {
        techStack: true,
        user: true,
      },
    });

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found.",
      });
    }

    const technologies =
      repository.techStack?.technologies || [];

    const analysis = await analyzePullRequest({
      owner: repository.owner,
      repo: repository.name,
      prNumber: Number(prNumber),
      githubToken: repository.user.githubToken,
      technologies,
    });

    const savedAnalysis =
      await savePullRequestAnalysis({
        repositoryId,
        prNumber: Number(prNumber),
        title: `Pull Request #${prNumber}`,
        analysis,
      });

    return res.json({
      success: true,
      data: savedAnalysis,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze pull request.",
    });
  }
};

const getPullRequestAnalysis = async (req, res) => {
  try {
    const { repositoryId, prNumber } = req.params;

const prNumberInt = Number(prNumber);

if (Number.isNaN(prNumberInt)) {
  return res.status(400).json({
    success: false,
    message: "Invalid pull request number.",
  });
}

    const analysis =
      await prisma.pullRequestAnalysis.findUnique({
        where: {
          repositoryId_prNumber: {
            repositoryId,
            prNumber: Number(prNumber),
          },
        },
      });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found.",
      });
    }

    return res.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

module.exports = {
  analyzePullRequestController,
  getPullRequestAnalysis,
};