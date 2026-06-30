const analyticsService = require("./analytics.service");

const architectureService = require("./architecture/architecturePersistence.service");

const technicalDebtService = require("./technicalDebt/technicalDebt.service");

const deploymentService = require("./deployment/deploymentService");

class RepositoryAnalysisService {
  async analyzeRepository(repositoryId) {
    console.log("Starting repository analysis...");

    const analytics = await analyticsService.analyzeAndStore(repositoryId);

    const architecture =
      await architectureService.analyzeAndStore(repositoryId);

    const technicalDebt =
      await technicalDebtService.analyzeAndStore(repositoryId);

    const deployment = await deploymentService.analyzeAndStore(repositoryId);

    return {
      analytics,
      architecture,
      technicalDebt,
      deployment,
    };
  }
}

module.exports = new RepositoryAnalysisService();
