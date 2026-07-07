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

  async generateRepositoryReview(prompt) {
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
        return JSON.parse(cleanedResponse);
      } catch (error) {
        console.error("Invalid Gemini JSON Response:");
        console.error(cleanedResponse);

        throw new Error("Gemini returned an invalid JSON response.");
      }
    } catch (error) {
      console.error("Gemini Provider Error:", error);

      throw new Error("Failed to generate AI repository review.");
    }
  }
}

module.exports = GeminiProvider;
