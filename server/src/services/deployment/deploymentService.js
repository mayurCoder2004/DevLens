const repositoryScanner = require("../architecture/repositoryScanner");
const deploymentAnalyzer = require("../deploymentAnalyzer.service");
const prisma = require("../../config/prisma");

const { logActivity } = require("../activityLogger.service");

async function analyzeRepositoryDeployment(repository, githubToken) {
  const contents = await repositoryScanner.getRepositoryContents(
    repository.owner,
    repository.name,
    githubToken,
  );

  const report = await deploymentAnalyzer.analyzeDeployment(contents);

  await deploymentAnalyzer.saveDeploymentReport(repository.id, report);

  await logActivity({
    repositoryId: repository.id,
    type: "DEPLOYMENT",
    title: "Deployment Analysis Completed",
    description: `Deployment analysis completed for ${repository.owner}/${repository.name}.`,
    metadata: {
      deploymentScore: report.deploymentScore,
      deploymentStatus: report.deploymentStatus,
      infrastructureScore: report.infrastructureScore,
      configurationScore: report.configurationScore,
      buildReadinessScore: report.buildReadinessScore,
      ciCdScore: report.ciCdScore,
    },
  });

  return report;
}

async function analyzeAndStore(repositoryId) {
  const repository = await prisma.repository.findUnique({
    where: {
      id: repositoryId,
    },
    include: {
      user: true,
    },
  });

  if (!repository) {
    throw new Error("Repository not found");
  }

  return await analyzeRepositoryDeployment(
    repository,
    repository.user.githubToken,
  );
}

module.exports = {
  analyzeRepositoryDeployment,
  analyzeAndStore,
};
