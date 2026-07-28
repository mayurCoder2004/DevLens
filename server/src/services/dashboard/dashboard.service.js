const prisma = require("../../config/prisma");

const average = (values) => {
  if (!values.length) return 0;

  return Math.round(
    values.reduce((sum, value) => sum + value, 0) / values.length
  );
};

const getEngineeringStatus = (score) => {
  if (score >= 90) return "Outstanding";
  if (score >= 80) return "Excellent Health";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  return "Needs Attention";
};

const getDeploymentStatus = (score) => {
  if (score >= 90) return "Production Ready";
  if (score >= 75) return "Almost Ready";
  if (score >= 60) return "Needs Improvement";
  return "Not Ready";
};

const getDashboardOverview = async (userId) => {
  const [
    engineeringHealth,
    technicalDebt,
    deployment,
    aiReviews,
  ] = await Promise.all([
    prisma.repositoryHealth.findMany({
      where: {
        repository: {
          userId,
        },
      },
      select: {
        healthScore: true,
      },
    }),

    prisma.repositoryTechnicalDebt.findMany({
      where: {
        repository: {
          userId,
        },
      },
      select: {
        maintainabilityScore: true,
      },
    }),

    prisma.repositoryDeployment.findMany({
      where: {
        repository: {
          userId,
        },
      },
      select: {
        deploymentScore: true,
      },
    }),

    prisma.repositoryAIReview.count({
      where: {
        repository: {
          userId,
        },
      },
    }),
  ]);

  const engineeringScore = average(
    engineeringHealth.map((item) => item.healthScore)
  );

  const maintainabilityScore = average(
    technicalDebt.map((item) => item.maintainabilityScore)
  );

  const deploymentScore = average(
    deployment.map((item) => item.deploymentScore)
  );

  return {
    engineeringHealth: {
      score: engineeringScore,
      scoreText: `${engineeringScore}%`,
      status: getEngineeringStatus(engineeringScore),
    },

    technicalDebt: {
      score: maintainabilityScore,
      scoreText: `${maintainabilityScore}%`,
      status:
        maintainabilityScore >= 80
          ? "Low Technical Debt"
          : "Needs Refactoring",
    },

    deployment: {
      score: deploymentScore,
      scoreText: `${deploymentScore}%`,
      status: getDeploymentStatus(deploymentScore),
    },

    aiReviews: {
      count: aiReviews,
      countText: aiReviews.toString(),
    },

    analyzedRepositories: engineeringHealth.length,
  };
};

const getRepositoriesNeedingAttention = async (userId) => {
  const repositories = await prisma.repository.findMany({
    where: {
      userId,
    },
    include: {
      health: true,
      technicalDebt: true,
      deployment: true,
    },
  });

  const attentionItems = repositories
    .map((repo) => {
      if (
        !repo.health &&
        !repo.technicalDebt &&
        !repo.deployment
      ) {
        return null;
      }

      const issues = [];

      const healthScore = repo.health?.healthScore;
      const deploymentScore =
        repo.deployment?.deploymentScore;
      const maintainabilityScore =
        repo.technicalDebt?.maintainabilityScore;

      // -------------------------
      // Technical Debt Risk
      // -------------------------

      let technicalDebtRisk = 0;

      if (
        (repo.technicalDebt?.circularDependencyCount ?? 0) > 0
      ) {
        technicalDebtRisk += 30;
        issues.push("Circular dependencies detected");
      }

      if (
        (repo.technicalDebt?.largeFileCount ?? 0) > 0
      ) {
        technicalDebtRisk += 15;
        issues.push("Large files detected");
      }

      if (
        (repo.technicalDebt?.deadFileCount ?? 0) > 0
      ) {
        technicalDebtRisk += 15;
        issues.push("Dead files detected");
      }

      technicalDebtRisk = Math.min(technicalDebtRisk, 100);

      // -------------------------
      // Weighted Risk
      // -------------------------

      let weightedRisk = 0;
      let totalWeight = 0;

      if (repo.health) {
        weightedRisk += (100 - healthScore) * 0.45;
        totalWeight += 0.45;
      }

      if (repo.deployment) {
        weightedRisk += (100 - deploymentScore) * 0.30;
        totalWeight += 0.30;
      }

      if (repo.technicalDebt) {
        weightedRisk +=
          (100 - maintainabilityScore) * 0.15;
        totalWeight += 0.15;

        weightedRisk += technicalDebtRisk * 0.10;
        totalWeight += 0.10;
      }

      const riskScore =
        totalWeight > 0
          ? Math.round(weightedRisk / totalWeight)
          : 0;

      // -------------------------
      // Human-readable Issues
      // -------------------------

      if (healthScore !== undefined) {
        if (healthScore < 40) {
          issues.unshift("Critical engineering health");
        } else if (healthScore < 60) {
          issues.unshift("Poor engineering health");
        } else if (healthScore < 70) {
          issues.unshift(
            "Engineering health needs improvement"
          );
        }
      }

      if (deploymentScore !== undefined) {
        if (deploymentScore < 40) {
          issues.push("Deployment not production ready");
        } else if (deploymentScore < 60) {
          issues.push("Deployment needs improvement");
        }
      }

      if (maintainabilityScore !== undefined) {
        if (maintainabilityScore < 40) {
          issues.push("Very low maintainability");
        } else if (maintainabilityScore < 60) {
          issues.push("Low maintainability");
        } else if (maintainabilityScore < 70) {
          issues.push(
            "Maintainability could be improved"
          );
        }
      }

      const uniqueIssues = [...new Set(issues)];

      // -------------------------
      // Severity
      // -------------------------

      let severity = "LOW";

      if (riskScore >= 85) {
        severity = "CRITICAL";
      } else if (riskScore >= 70) {
        severity = "HIGH";
      } else if (riskScore >= 50) {
        severity = "MEDIUM";
      }

      return {
        repositoryId: repo.id,
        name: repo.name,
        owner: repo.owner,

        severity,
        riskScore,

        healthScore,
        deploymentScore,
        maintainabilityScore,

        issues: uniqueIssues,
      };
    })
    .filter(Boolean)
    .filter((repo) => repo.riskScore >= 25)
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 5);

  return attentionItems;
};

module.exports = {
  getDashboardOverview,
  getRepositoriesNeedingAttention,
};