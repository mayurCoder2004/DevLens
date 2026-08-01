const prisma = require("../config/prisma");

const architectureIntelligenceService = require(
  "../services/architecture/architectureIntelligence.service"
);

const {
  getRepositories: fetchGithubRepositories,
} = require("../services/github.service");

const { logActivity } = require("../services/activityLogger.service");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// ============================
// Sync GitHub Repositories
// ============================

const syncRepositories = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const repos = await fetchGithubRepositories(user.githubToken);

  for (const repo of repos) {
    await prisma.repository.upsert({
      where: {
        githubRepoId: repo.id,
      },

      update: {
        name: repo.name,
        owner: repo.owner.login,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        private: repo.private,
        repoUrl: repo.html_url,
        defaultBranch: repo.default_branch,
        updatedAtGithub: repo.updated_at
          ? new Date(repo.updated_at)
          : null,
      },

      create: {
        githubRepoId: repo.id,
        name: repo.name,
        owner: repo.owner.login,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        private: repo.private,
        repoUrl: repo.html_url,
        defaultBranch: repo.default_branch,
        userId: user.id,
        updatedAtGithub: repo.updated_at
          ? new Date(repo.updated_at)
          : null,
      },
    });
  }

  // Log activity after successful synchronization
  await logActivity({
    userId: user.id,
    type: "REPOSITORY_SYNC",
    title: "GitHub repositories synchronized",
    description: `Successfully synchronized ${repos.length} repositories from GitHub.`,
    metadata: {
      repositoryCount: repos.length,
    },
  });

  return res.status(200).json({
    success: true,
    count: repos.length,
  });
});

// ============================
// Get User Repositories
// ============================

const getUserRepositories = asyncHandler(async (req, res) => {
  const repos = await prisma.repository.findMany({
    where: {
      userId: req.user.userId,
    },

    orderBy: {
      stars: "desc",
    },
  });

  return res.status(200).json({
    success: true,
    repositories: repos,
  });
});

// ============================
// Get Repository By ID
// ============================

const getRepositoryById = asyncHandler(async (req, res) => {
  const { repositoryId } = req.validatedData.params;

  const repository = await prisma.repository.findFirst({
  where: {
    id: repositoryId,
    userId: req.user.userId,
  },
  include: {
    analytics: true,
    health: true,
    architecture: true,
    technicalDebt: true,
    deployment: true,
    techStack: true,
    aiReview: {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        modelUsed: true,
      },
    },
  },
});

  if (!repository) {
    throw new ApiError(404, "Repository not found");
  }

  return res.status(200).json({
    success: true,
    repository,
  });
});

// ============================
// Get Repository Architecture
// ============================

const getRepositoryArchitecture = asyncHandler(async (req, res) => {
  const { repositoryId } = req.validatedData.params;

  const repository = await prisma.repository.findFirst({
    where: {
      id: repositoryId,
      userId: req.user.userId,
    },
    include: {
      architecture: true,
    },
  });

  if (!repository) {
    throw new ApiError(404, "Repository not found");
  }

  if (!repository.architecture) {
    throw new ApiError(404, "Architecture analysis not found");
  }

  const intelligence = await architectureIntelligenceService.generate(
    repository.architecture
  );

  return res.status(200).json({
    success: true,
    architecture: repository.architecture,
    ...intelligence,
  });
});

module.exports = {
  syncRepositories,
  getUserRepositories,
  getRepositoryById,
  getRepositoryArchitecture,
};