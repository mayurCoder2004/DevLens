const architectureAnalytics = require("./architectureAnalytics");
const architectureInsights = require("./architectureInsights");
const architectureRecommendations = require("./architectureRecommendations");

class ArchitectureIntelligenceService {
  /**
   * Generate all architecture intelligence for a repository.
   *
   * @param {Object} repositoryArchitecture
   * @returns {Object}
   */
  async generate(repositoryArchitecture) {
    if (!repositoryArchitecture) {
      throw new Error("Architecture data not found.");
    }

    const {
      graph,
      nodeCount,
      edgeCount,
      complexityScore,
      hasCircularDependency,
    } = repositoryArchitecture;

    // -----------------------------------------------------
    // Analytics
    // -----------------------------------------------------

    const analytics = architectureAnalytics.calculate(graph);

    // -----------------------------------------------------
    // Insights
    // -----------------------------------------------------

    const insights = architectureInsights.generate({
      metrics: {
        nodeCount,
        edgeCount,
        complexityScore,
      },
      analytics,
      hasCircularDependency,
    });

    // -----------------------------------------------------
    // Recommendations
    // -----------------------------------------------------

    const recommendations =
      await architectureRecommendations.generate({
        architecture: repositoryArchitecture,
        analytics,
        insights,
      });

    return {
      analytics,
      insights,
      recommendations,
    };
  }
}

module.exports = new ArchitectureIntelligenceService();