const prisma = require("../config/prisma");
const architectureAnalytics = require("../services/architecture/architectureAnalytics");
const architectureInsights = require("../services/architecture/architectureInsights");

const {
  getRepositories: fetchGithubRepositories,
} = require("../services/github.service");

const syncRepositories = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("DB TOKEN:", user.githubToken);

    const repos = await fetchGithubRepositories(user.githubToken);

    console.log("Repos fetched from GitHub:", repos.length);

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
          updatedAtGithub: repo.updated_at ? new Date(repo.updated_at) : null,
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
          updatedAtGithub: repo.updated_at ? new Date(repo.updated_at) : null,
        },
      });
    }

    return res.status(200).json({
      success: true,
      count: repos.length,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserRepositories = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRepositoryById = async (req, res) => {
  try {
    const repository = await prisma.repository.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found",
      });
    }

    return res.status(200).json({
      success: true,
      repository,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRepositoryArchitecture = async (req, res) => {
  try {
    const repository = await prisma.repository.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
      include: {
        architecture: true,
      },
    });

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found",
      });
    }

    if (!repository.architecture) {
      return res.status(404).json({
        success: false,
        message: "Architecture analysis not found",
      });
    }

    const analytics = architectureAnalytics.calculate(
      repository.architecture.graph,
    );

    const insights = architectureInsights.generate({
      metrics: {
        nodeCount: repository.architecture.nodeCount,
        edgeCount: repository.architecture.edgeCount,
        complexityScore: repository.architecture.complexityScore,
      },
      analytics,
      hasCircularDependency:
        repository.architecture.hasCircularDependency,
    });

    return res.status(200).json({
      success: true,
      architecture: repository.architecture,
      analytics,
      insights,
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
  syncRepositories,
  getUserRepositories,
  getRepositoryById,
  getRepositoryArchitecture
};
