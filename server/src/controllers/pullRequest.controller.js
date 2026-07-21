const prisma = require("../config/prisma");

const {
  analyzePullRequest,
} = require("../services/pullRequestAnalysis.service");

const {
  savePullRequestAnalysis,
} = require("../services/pullRequestPersistence.service");

const { Octokit } = require("@octokit/rest");

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

    const technologies = repository.techStack?.technologies || [];

    const analysis = await analyzePullRequest({
      owner: repository.owner,
      repo: repository.name,
      prNumber: Number(prNumber),
      githubToken: repository.user.githubToken,
      technologies,
    });

    const savedAnalysis = await savePullRequestAnalysis({
      repositoryId,
      prNumber: prNumberInt,
      title: analysis.pullRequest.title,
      analysis,
    });

    return res.json({
      success: true,
      data: analysis,
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

    const repository = await prisma.repository.findUnique({
      where: {
        id: repositoryId,
      },
      include: {
        user: true,
      },
    });

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found.",
      });
    }

    const analysis = await prisma.pullRequestAnalysis.findUnique({
      where: {
        repositoryId_prNumber: {
          repositoryId,
          prNumber: prNumberInt,
        },
      },
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found.",
      });
    }

    const octokit = new Octokit({
      auth: repository.user.githubToken,
    });

    const { data: pullRequest } =
      await octokit.pulls.get({
        owner: repository.owner,
        repo: repository.name,
        pull_number: prNumberInt,
      });

    return res.json({
      success: true,
      data: {
        ...analysis,

        state: pullRequest.state,
        author: pullRequest.user.login,
        authorAvatar: pullRequest.user.avatar_url,

        baseBranch: pullRequest.base.ref,
        headBranch: pullRequest.head.ref,

        merged: pullRequest.merged,

        url: pullRequest.html_url,

        createdAt: pullRequest.created_at,
        updatedAt: pullRequest.updated_at,
      },
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
