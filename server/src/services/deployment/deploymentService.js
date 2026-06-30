const repositoryScanner = require("../architecture/repositoryScanner");
const deploymentAnalyzer = require("../deploymentAnalyzer.service");
const prisma = require("../../config/prisma");

async function analyzeRepositoryDeployment(
  repository,
  githubToken
) {
  const contents =
    await repositoryScanner.getRepositoryContents(
      repository.owner,
      repository.name,
      githubToken
    );

  const report =
    await deploymentAnalyzer.analyzeDeployment(
      contents
    );

  await deploymentAnalyzer.saveDeploymentReport(
    repository.id,
    report
  );

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
    repository.user.githubToken
  );
}

module.exports = {
  analyzeRepositoryDeployment,
  analyzeAndStore,
};