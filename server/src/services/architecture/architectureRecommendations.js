const AIProviderFactory = require("../ai/AIProviderFactory");
const architecturePromptBuilder = require("./architecturePromptBuilder");
const logger = require("../../config/logger");

class ArchitectureRecommendationsService {
  constructor() {
    // Use AI Orchestrator with automatic fallback
    this.aiProvider = AIProviderFactory.getOrchestrator();
  }

  async generate({ architecture, analytics, insights }) {
    const prompt = architecturePromptBuilder.build({
      architecture,
      analytics,
      insights,
    });

    logger.info("Generating architecture recommendations");

    const recommendations =
      await this.aiProvider.generateStructuredResponse(prompt);

    if (!Array.isArray(recommendations)) {
      throw new Error("Invalid recommendations returned by AI.");
    }

    logger.info(
      `Generated ${recommendations.length} architecture recommendations`,
    );

    return recommendations;
  }
}

module.exports = new ArchitectureRecommendationsService();
