const prisma = require("../config/prisma");

const {
  analyzePullRequest,
} = require("../services/pullRequestAnalysis.service");

const {
  savePullRequestAnalysis,
} = require("../services/pullRequestPersistence.service");

const { Octokit } = require("@octokit/rest");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// ============================
// Analyze Pull Request
// ============================

const analyzePullRequestController = asyncHandler(async (req, res) => {
  const { repositoryId, prNumber } = req.validatedData.params;

  const repository = await prisma.repository.findFirst({
    where: {
      id: repositoryId,
      userId: req.user.userId,
    },
    include: {
      techStack: true,
      user: true,
    },
  });

  if (!repository) {
    throw new ApiError(404, "Repository not found");
  }

  const technologies = repository.techStack?.technologies || [];

  const analysis = await analyzePullRequest({
    owner: repository.owner,
    repo: repository.name,
    prNumber,
    githubToken: repository.user.githubToken,
    technologies,
  });

  await savePullRequestAnalysis({
    repositoryId,
    prNumber,
    title: analysis.pullRequest.title,
    analysis,
  });

  return res.status(200).json({
    success: true,
    data: analysis,
  });
});

// ============================
// Get Pull Request Analysis
// ============================

const getPullRequestAnalysis = asyncHandler(async (req, res) => {
  const { repositoryId, prNumber } = req.validatedData.params;

  const repository = await prisma.repository.findFirst({
    where: {
      id: repositoryId,
      userId: req.user.userId,
    },
    include: {
      user: true,
    },
  });

  if (!repository) {
    throw new ApiError(404, "Repository not found");
  }

  const analysis = await prisma.pullRequestAnalysis.findUnique({
    where: {
      repositoryId_prNumber: {
        repositoryId,
        prNumber,
      },
    },
  });

  if (!analysis) {
    throw new ApiError(404, "Analysis not found");
  }

  const octokit = new Octokit({
    auth: repository.user.githubToken,
  });

  const { data: pullRequest } = await octokit.pulls.get({
    owner: repository.owner,
    repo: repository.name,
    pull_number: prNumber,
  });

  return res.status(200).json({
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
});

module.exports = {
  analyzePullRequestController,
  getPullRequestAnalysis,
};