const { GoogleGenAI } = require("@google/genai");
const AIProvider = require("./aiProvider");

class GeminiProvider extends AIProvider {
  constructor() {
    super();

    this.client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    this.model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  }

  async generateStructuredResponse(prompt) {
    try {
      const response = await this.client.models.generateContent({
        model: this.model,
        contents: prompt,
      });

      const cleanedResponse = response.text
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .trim();

      try {
  const parsedResponse = JSON.parse(cleanedResponse);

  this.validateRepositoryReview(parsedResponse);

  return parsedResponse;
} catch (error) {
  console.error("Invalid Gemini JSON Response:");
  console.error(cleanedResponse);

  throw new Error(
    `Gemini returned an invalid structured response: ${error.message}`,
  );
}
    } catch (error) {
      console.error("Gemini Provider Error:", error);

      throw new Error("Failed to generate AI response.");
    }
  }

  validateRepositoryReview(review) {
  const requiredFields = [
    "executiveSummary",
    "engineeringScore",
    "strengths",
    "criticalIssues",
    "actionPlan",
    "technologyInsights",
    "architectureSuggestions",
  ];

  for (const field of requiredFields) {
    if (!(field in review)) {
      throw new Error(
        `Gemini response is missing required field: ${field}`,
      );
    }
  }

  if (!Array.isArray(review.strengths)) {
    throw new Error("strengths must be an array.");
  }

  if (!Array.isArray(review.criticalIssues)) {
    throw new Error("criticalIssues must be an array.");
  }

  if (!Array.isArray(review.actionPlan)) {
    throw new Error("actionPlan must be an array.");
  }

  if (!Array.isArray(review.technologyInsights)) {
    throw new Error("technologyInsights must be an array.");
  }

  if (!Array.isArray(review.architectureSuggestions)) {
    throw new Error("architectureSuggestions must be an array.");
  }
}
}

module.exports = GeminiProvider;