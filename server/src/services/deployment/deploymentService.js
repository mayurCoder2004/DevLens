const repositoryScanner = require("../architecture/repositoryScanner");
const deploymentAnalyzer = require("../deploymentAnalyzer.service");

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

module.exports = {
  analyzeRepositoryDeployment,
};