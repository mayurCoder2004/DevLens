const prisma = require("../config/prisma");

const {
  analyzePullRequest,
} = require("../services/pullRequestAnalysis.service");

const {
  savePullRequestAnalysis,
} = require("../services/pullRequestPersistence.service");

const {
  analyzeChangeImpact,
} = require("../services/changeImpact/changeImpact.service");

const {
  createChangeImpactAnalysis,
} = require("../services/changeImpact/changeImpactPersistence.service");

const { logActivity } = require("../services/activityLogger.service");

const { Octokit } = require("@octokit/rest");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const {
  listRepositoryPullRequests,
} = require("../services/pullRequestList.service");

// ============================
// Analyze Pull Request
// ============================

const analyzePullRequestController = asyncHandler(async (req, res) => {
  const { repositoryId, prNumber } = req.validatedData.params;

  // --------------------------------------------
  // Load repository
  // --------------------------------------------

  const repository = await prisma.repository.findFirst({
    where: {
      id: repositoryId,
      userId: req.user.userId,
    },

    include: {
      techStack: true,
      user: true,
      architecture: true,
    },
  });

  if (!repository) {
    throw new ApiError(404, "Repository not found");
  }

  // --------------------------------------------
  // Analyze Pull Request
  // --------------------------------------------

  const technologies = repository.techStack?.technologies || [];

  const analysis = await analyzePullRequest({
    owner: repository.owner,
    repo: repository.name,
    prNumber,
    githubToken: repository.user.githubToken,
    technologies,
  });

  // --------------------------------------------
  // Persist Pull Request Analysis
  // --------------------------------------------

  const savedPullRequestAnalysis =
    await savePullRequestAnalysis({
      repositoryId,
      prNumber,
      title: analysis.pullRequest.title,
      analysis,
    });

  // --------------------------------------------
  // Change Impact Analysis
  // --------------------------------------------

  let changeImpact = null;

  if (repository.architecture?.graph) {
    try {
      const graph = repository.architecture.graph;

      const changedFiles = analysis.files.map((file) => ({
        filename: file.filename,
        additions: file.additions,
        deletions: file.deletions,
        changes: file.changes,
        status: file.status,
      }));

      const criticalFiles =
        analysis.classification.categories.critical || [];

      changeImpact = analyzeChangeImpact({
        graph,
        changedFiles,
        criticalFiles,
      });

      // ------------------------------------------
      // Persist Change Impact
      // ------------------------------------------

      changeImpact =
        await createChangeImpactAnalysis({
          pullRequestAnalysisId:
            savedPullRequestAnalysis.id,

          impact: changeImpact,
        });
    } catch (error) {
      console.error(
        "Change Impact Analysis Error:",
        error.message,
      );

      // Change Impact should not make the
      // entire PR analysis fail.
      changeImpact = null;
    }
  } else {
    console.log(
      `Change Impact skipped: architecture analysis not found for repository ${repositoryId}.`,
    );
  }

  // --------------------------------------------
  // Activity Log
  // --------------------------------------------

  await logActivity({
    repositoryId,
    type: "PULL_REQUEST",
    title: `Pull Request #${prNumber} Analyzed`,
    description: `Pull request analysis completed for ${repository.owner}/${repository.name}.`,
    metadata: {
      prNumber,

      riskScore:
        analysis.risk?.score ?? null,

      riskLevel:
        analysis.risk?.level ?? null,

      changeImpactScore:
        changeImpact?.score ?? null,

      changeImpactLevel:
        changeImpact?.level ?? null,

      summary: analysis.summary,

      hasDependencyChanges:
        analysis.classification.summary
          .dependencyCount > 0,

      hasConfigurationChanges:
        analysis.classification.summary
          .infrastructureCount > 0,

      criticalFiles:
        analysis.classification.categories
          .critical?.length ?? 0,
    },
  });

  // --------------------------------------------
  // Response
  // --------------------------------------------

  return res.status(200).json({
    success: true,

    data: {
      ...analysis,

      persistedAnalysis: savedPullRequestAnalysis,

      changeImpact,
    },
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

    include: {
      changeImpact: true,
    },
  });

  if (!analysis) {
    throw new ApiError(404, "Analysis not found");
  }

  const octokit = new Octokit({
    auth: repository.user.githubToken,
  });

  const { data: pullRequest } =
    await octokit.pulls.get({
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

// ============================
// Get Repository Pull Requests
// ============================

const getRepositoryPullRequests = asyncHandler(
  async (req, res) => {
    const { repositoryId } =
      req.validatedData.params;

    const repository =
      await prisma.repository.findFirst({
        where: {
          id: repositoryId,
          userId: req.user.userId,
        },

        include: {
          user: true,
        },
      });

    if (!repository) {
      throw new ApiError(
        404,
        "Repository not found",
      );
    }

    const pullRequests =
      await listRepositoryPullRequests({
        owner: repository.owner,
        repo: repository.name,
        githubToken:
          repository.user.githubToken,
      });

    return res.status(200).json({
      success: true,
      data: pullRequests,
    });
  },
);

module.exports = {
  analyzePullRequestController,
  getPullRequestAnalysis,
  getRepositoryPullRequests,
};