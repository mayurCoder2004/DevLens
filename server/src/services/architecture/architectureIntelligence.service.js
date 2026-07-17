const architectureAnalytics = require("./architectureAnalytics");
const architectureInsights = require("./architectureInsights");

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

    // Generate analytics from dependency graph
    const analytics = architectureAnalytics.calculate(graph);

    // Generate engineering insights
    const insights = architectureInsights.generate({
      metrics: {
        nodeCount,
        edgeCount,
        complexityScore,
      },
      analytics,
      hasCircularDependency,
    });

    /**
     * Placeholder for AI-powered recommendations.
     * In the next commit, this will be replaced with:
     *
     * const recommendations =
     *   await architectureRecommendations.generate({
     *     architecture: repositoryArchitecture,
     *     analytics,
     *     insights,
     *   });
     */
    const recommendations = [];

    return {
      analytics,
      insights,
      recommendations,
    };
  }
}

module.exports = new ArchitectureIntelligenceService();