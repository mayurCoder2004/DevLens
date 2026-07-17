const GeminiProvider = require("../ai/providers/gemini.provider");
const architecturePromptBuilder = require("./architecturePromptBuilder");

class ArchitectureRecommendationsService {
  constructor() {
    this.aiProvider = new GeminiProvider();
  }

  async generate({
    architecture,
    analytics,
    insights,
  }) {
    const prompt = architecturePromptBuilder.build({
      architecture,
      analytics,
      insights,
    });

    const recommendations =
      await this.aiProvider.generateStructuredResponse(prompt);

    if (!Array.isArray(recommendations)) {
      throw new Error(
        "Invalid recommendations returned by AI."
      );
    }

    return recommendations;
  }
}

module.exports =
  new ArchitectureRecommendationsService();