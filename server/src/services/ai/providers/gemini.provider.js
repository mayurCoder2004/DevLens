const { GoogleGenAI } = require("@google/genai");
const AIProvider = require("./aiProvider");
const env = require("../../../config/env");
const logger = require("../../../config/logger");
const ApiError = require("../../../utils/ApiError");

const MAX_PROMPT_LENGTH = 50000;
const MAX_RETRIES = 3;

class GeminiProvider extends AIProvider {
  constructor() {
    super();

    this.client = new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY,
    });

    this.model = env.GEMINI_MODEL;
  }

  async generateStructuredResponse(prompt) {
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      throw new ApiError(400, "Prompt cannot be empty.");
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      throw new ApiError(
        400,
        `Prompt exceeds maximum length of ${MAX_PROMPT_LENGTH} characters.`
      );
    }

    let response;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        response = await this.client.models.generateContent({
          model: this.model,
          contents: prompt,
          config: {
            temperature: 0.2,
            maxOutputTokens: 4096,
          },
        });

        break;
      } catch (error) {
        logger.warn(
          `Gemini request failed (attempt ${attempt}/${MAX_RETRIES}): ${error.message}`
        );

        if (attempt === MAX_RETRIES) {
          logger.error(error.stack || error.message);

          throw new ApiError(
            502,
            "AI service is temporarily unavailable. Please try again later."
          );
        }

        await new Promise((resolve) =>
          setTimeout(resolve, attempt * 1000)
        );
      }
    }

    if (!response?.text) {
      throw new ApiError(
        502,
        "Gemini returned an empty response."
      );
    }

    const cleanedResponse = response.text
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    try {
      const parsedResponse = JSON.parse(cleanedResponse);

      // Generic provider:
      // Do NOT validate any specific schema here.
      // Each service should validate its own response.

      return parsedResponse;
    } catch (error) {
  logger.error("Invalid Gemini JSON Response");
  logger.error("Parse Error:", error.message);
  logger.error("Raw Response:");
  logger.error(cleanedResponse);

  throw new ApiError(
    502,
    "AI returned an invalid structured response."
  );
}
  }
}

module.exports = GeminiProvider;