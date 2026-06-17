const prisma = require("../config/prisma");

const { getRepositoryFilesMetadata } = require("./repositoryFiles.service");

const {
  calculateActivityScore,
  calculateDocumentationScore,
  calculateMaintenanceScore,
  calculateOpenSourceScore,
} = require("./health.service");

const generateRepositoryHealth = async (repository, analytics, githubToken) => {
  const filesMetadata = await getRepositoryFilesMetadata(
    repository.owner,
    repository.name,
    githubToken,
  );

  const activityScore = calculateActivityScore(analytics);

  const documentationScore = calculateDocumentationScore(filesMetadata);

  const maintenanceScore = calculateMaintenanceScore(repository, analytics);

  const openSourceScore = calculateOpenSourceScore(filesMetadata);

  const healthScore = Math.round(
    activityScore * 0.4 +
      documentationScore * 0.25 +
      maintenanceScore * 0.25 +
      openSourceScore * 0.1,
  );

  const recommendations = [];

  if (!filesMetadata.hasReadme) {
    recommendations.push("Add a README file");
  }

  if (!filesMetadata.hasLicense) {
    recommendations.push("Add a LICENSE file");
  }

  if (!filesMetadata.hasContributingGuide) {
    recommendations.push("Add CONTRIBUTING.md");
  }

  if (analytics.openIssues > 20) {
    recommendations.push("Reduce open issues");
  }

  return {
    healthScore,
    activityScore,
    documentationScore,
    maintenanceScore,
    openSourceScore,
    recommendations,
  };
};

module.exports = {
  generateRepositoryHealth,
};
