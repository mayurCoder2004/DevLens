const analyticsService = require("./analytics.service");

const architectureService = require("./architecture/architecturePersistence.service");

const technicalDebtService = require("./technicalDebt/technicalDebt.service");

const deploymentService = require("./deployment/deploymentService");

const repositorySnapshotService = require("./repositorySnapshot.service");

const snapshotComparisonService = require("./snapshotComparison.service");

class RepositoryAnalysisService {
  async analyzeRepository(repositoryId) {
    console.log("Starting repository analysis...");

    // --------------------------------------------
    // Capture previous snapshot BEFORE analysis
    // --------------------------------------------

    const previousSnapshot =
      await repositorySnapshotService.getLatestRepositorySnapshot(
        repositoryId,
      );

    // --------------------------------------------
    // Run repository analysis
    // --------------------------------------------

    const analytics =
      await analyticsService.analyzeAndStore(repositoryId);

    const architecture =
      await architectureService.analyzeAndStore(repositoryId);

    const technicalDebt =
      await technicalDebtService.analyzeAndStore(repositoryId);

    const deployment =
      await deploymentService.analyzeAndStore(repositoryId);

    // --------------------------------------------
    // Create current repository snapshot
    // --------------------------------------------

    const snapshot =
      await repositorySnapshotService.createRepositorySnapshot(
        repositoryId,
      );

    // --------------------------------------------
    // Compare previous and current snapshots
    // --------------------------------------------

    const comparison =
      snapshotComparisonService.compareSnapshots(
        previousSnapshot,
        snapshot,
      );

    // --------------------------------------------
    // Return complete analysis
    // --------------------------------------------

    return {
      analytics,
      architecture,
      technicalDebt,
      deployment,

      snapshot,

      snapshotComparison: comparison,
    };
  }
}

module.exports = new RepositoryAnalysisService();
