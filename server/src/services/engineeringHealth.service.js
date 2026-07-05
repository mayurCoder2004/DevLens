const prisma = require("../config/prisma");

const ENGINEERING_WEIGHTS = {
  health: 30,
  architecture: 20,
  technicalDebt: 25,
  deployment: 15,
  pullRequest: 10,
};

const engineeringHealthService = {
  async getEngineeringHealth(repositoryId) {
    const repository = await prisma.repository.findUnique({
      where: {
        id: repositoryId,
      },
      include: {
        health: true,
        architecture: true,
        technicalDebt: true,
        deployment: true,
        pullRequestAnalyses: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (!repository) {
      throw new Error("Repository not found");
    }

    const engineeringScore = this.calculateEngineeringScore(repository);

    const status = this.getEngineeringStatus(engineeringScore);

    return this.buildDashboardResponse(repository, engineeringScore, status);
  },

  calculateEngineeringScore(data) {
    let totalScore = 0;
    let totalWeight = 0;

    if (data.health) {
      totalScore += data.health.healthScore * ENGINEERING_WEIGHTS.health;

      totalWeight += ENGINEERING_WEIGHTS.health;
    }

    if (data.architecture) {
      const architectureScore = this.calculateArchitectureHealthScore(
        data.architecture,
      );

      totalScore += architectureScore * ENGINEERING_WEIGHTS.architecture;

      totalWeight += ENGINEERING_WEIGHTS.architecture;
    }

    if (data.technicalDebt) {
      totalScore +=
        data.technicalDebt.technicalDebtScore *
        ENGINEERING_WEIGHTS.technicalDebt;

      totalWeight += ENGINEERING_WEIGHTS.technicalDebt;
    }

    if (data.deployment) {
      totalScore +=
        data.deployment.deploymentScore * ENGINEERING_WEIGHTS.deployment;

      totalWeight += ENGINEERING_WEIGHTS.deployment;
    }

    if (data.pullRequestAnalyses.length > 0) {
      const latestPullRequest = data.pullRequestAnalyses[0];

      const pullRequestScore = 100 - latestPullRequest.riskScore;

      totalScore += pullRequestScore * ENGINEERING_WEIGHTS.pullRequest;

      totalWeight += ENGINEERING_WEIGHTS.pullRequest;
    }

    if (totalWeight === 0) {
      return 0;
    }

    return Math.round(totalScore / totalWeight);
  },

  calculateArchitectureHealthScore(architecture) {
    let score = 100;

    const { complexityScore, hasCircularDependency } = architecture;

    if (complexityScore > 300) {
      score = 40;
    } else if (complexityScore > 200) {
      score = 60;
    } else if (complexityScore > 150) {
      score = 70;
    } else if (complexityScore > 100) {
      score = 80;
    } else if (complexityScore > 50) {
      score = 90;
    }

    if (hasCircularDependency) {
      score -= 10;
    }

    return Math.max(score, 0);
  },

  getEngineeringStatus(score) {
    if (score >= 90) {
      return "Excellent";
    }

    if (score >= 80) {
      return "Healthy";
    }

    if (score >= 70) {
      return "Good";
    }

    if (score >= 60) {
      return "Needs Attention";
    }

    return "Critical";
  },

  buildDashboardResponse(repository, engineeringScore, status) {
    const latestPullRequest =
      repository.pullRequestAnalyses.length > 0
        ? repository.pullRequestAnalyses[0]
        : null;

    return {
      repository: {
        id: repository.id,
        name: repository.name,
        owner: repository.owner,
        description: repository.description,
        language: repository.language,
        stars: repository.stars,
        defaultBranch: repository.defaultBranch,
      },

      engineeringScore,
      status,

      analysis: {
        generatedAt: new Date(),
      },

      scores: {
        repositoryHealth: repository.health?.healthScore ?? null,

        architecture: repository.architecture
          ? this.calculateArchitectureHealthScore(repository.architecture)
          : null,

        technicalDebt: repository.technicalDebt?.technicalDebtScore ?? null,

        deployment: repository.deployment?.deploymentScore ?? null,

        pullRequest: latestPullRequest
          ? 100 - latestPullRequest.riskScore
          : null,
      },

      strengths: this.generateStrengths(repository),

      priorityRecommendations: this.generatePriorityRecommendations(repository),
    };
  },

  collectHealthStrengths(repository) {
    const strengths = [];

    if (!repository.health) {
      return strengths;
    }

    const {
      healthScore,
      documentationScore,
      activityScore,
      maintenanceScore,
      openSourceScore,
    } = repository.health;

    if (healthScore >= 80) {
      strengths.push("Healthy repository");
    }

    if (documentationScore >= 80) {
      strengths.push("Well documented project");
    }

    if (activityScore >= 80) {
      strengths.push("Active repository maintenance");
    }

    if (maintenanceScore >= 80) {
      strengths.push("Good maintenance practices");
    }

    if (openSourceScore >= 80) {
      strengths.push("Open source ready");
    }

    return strengths;
  },

  collectArchitectureStrengths(repository) {
    const strengths = [];

    if (!repository.architecture) {
      return strengths;
    }

    const architectureScore = this.calculateArchitectureHealthScore(
      repository.architecture,
    );

    if (architectureScore >= 80) {
      strengths.push("Well structured architecture");
    }

    if (!repository.architecture.hasCircularDependency) {
      strengths.push("No circular dependencies detected");
    }

    return strengths;
  },

  collectTechnicalDebtStrengths(repository) {
    const strengths = [];

    if (!repository.technicalDebt) {
      return strengths;
    }

    const { technicalDebtScore, maintainabilityScore } =
      repository.technicalDebt;

    if (technicalDebtScore >= 80) {
      strengths.push("Low technical debt");
    }

    if (maintainabilityScore >= 80) {
      strengths.push("Highly maintainable codebase");
    }

    return strengths;
  },

  collectDeploymentStrengths(repository) {
    if (!repository.deployment) {
      return [];
    }

    return repository.deployment.strengths ?? [];
  },

  collectPullRequestStrengths(repository) {
    const strengths = [];

    const latestPullRequest = repository.pullRequestAnalyses[0] ?? null;

    if (!latestPullRequest) {
      return strengths;
    }

    if (latestPullRequest.riskScore <= 20) {
      strengths.push("Low pull request risk");
    }

    if (!latestPullRequest.hasDependencyChanges) {
      strengths.push("No dependency changes detected");
    }

    if (!latestPullRequest.hasConfigurationChanges) {
      strengths.push("No configuration changes detected");
    }

    if (latestPullRequest.criticalFiles.length === 0) {
      strengths.push("No critical files modified");
    }

    return strengths;
  },

  generateStrengths(repository) {
    return [
      ...new Set([
        ...this.collectHealthStrengths(repository),
        ...this.collectArchitectureStrengths(repository),
        ...this.collectTechnicalDebtStrengths(repository),
        ...this.collectDeploymentStrengths(repository),
        ...this.collectPullRequestStrengths(repository),
      ]),
    ].slice(0, 8);
  },

  generatePriorityRecommendations(repository) {
    return [
      ...new Set([
        ...this.collectHealthRecommendations(repository),
        ...this.collectArchitectureRecommendations(repository),
        ...this.collectTechnicalDebtRecommendations(repository),
        ...this.collectDeploymentRecommendations(repository),
        ...this.collectPullRequestRecommendations(repository),
      ]),
    ].slice(0, 5);
  },

  collectHealthRecommendations(repository) {
    if (!repository.health) {
      return [];
    }

    return repository.health.recommendations ?? [];
  },

  collectArchitectureRecommendations(repository) {
    const recommendations = [];

    if (!repository.architecture) {
      return recommendations;
    }

    if (repository.architecture.hasCircularDependency) {
      recommendations.push(
        "Resolve circular dependencies to improve maintainability.",
      );
    }

    if (repository.architecture.complexityScore > 200) {
      recommendations.push(
        "Reduce architectural complexity by simplifying module dependencies.",
      );
    }

    return recommendations;
  },

  collectTechnicalDebtRecommendations(repository) {
    if (!repository.technicalDebt) {
      return [];
    }

    return repository.technicalDebt.recommendations ?? [];
  },

  collectDeploymentRecommendations(repository) {
    if (!repository.deployment) {
      return [];
    }

    return repository.deployment.recommendations ?? [];
  },

  collectPullRequestRecommendations(repository) {
    const latestPullRequest = repository.pullRequestAnalyses[0] ?? null;

    if (!latestPullRequest) {
      return [];
    }

    return latestPullRequest.recommendations ?? [];
  },
};

module.exports = engineeringHealthService;
