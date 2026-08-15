const analyticsService = require("./analytics.service");

const architectureService = require("./architecture/architecturePersistence.service");

const technicalDebtService = require("./technicalDebt/technicalDebt.service");

const deploymentService = require("./deployment/deploymentService");

const repositorySnapshotService = require("./repositorySnapshot.service");

class RepositoryAnalysisService {
  async analyzeRepository(repositoryId) {
    console.log("Starting repository analysis...");

    const analytics = await analyticsService.analyzeAndStore(repositoryId);

    const architecture =
      await architectureService.analyzeAndStore(repositoryId);

    const technicalDebt =
      await technicalDebtService.analyzeAndStore(repositoryId);

    const deployment =
      await deploymentService.analyzeAndStore(repositoryId);

    // Create a repository health snapshot after
    // all analysis data has been updated.
    const snapshot =
      await repositorySnapshotService.createRepositorySnapshot(
        repositoryId,
      );

    return {
      analytics,
      architecture,
      technicalDebt,
      deployment,
      snapshot,
    };
  }
}

module.exports = new RepositoryAnalysisService();