const { GoogleGenAI } = require("@google/genai");
const AIProvider = require("./aiProvider");
const env = require("../../../config/env");
const logger = require("../../../config/logger");
const ApiError = require("../../../utils/ApiError");
const JSONValidator = require("../utils/jsonValidator");

const MAX_PROMPT_LENGTH = 50000;
const MAX_RETRIES = 2;

class GeminiProvider extends AIProvider {
  constructor() {
    super();

    this.client = new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY,
    });

    this.model = env.GEMINI_MODEL;
    this.providerName = "Gemini";
  }

  async generateStructuredResponse(prompt) {
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      throw new ApiError(400, "Prompt cannot be empty.");
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      throw new ApiError(
        400,
        `Prompt exceeds maximum length of ${MAX_PROMPT_LENGTH} characters.`,
      );
    }

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        logger.info(
          `Gemini Request | Model: ${this.model} | Attempt: ${attempt}/${MAX_RETRIES}`,
        );

        const response = await this.client.models.generateContent({
          model: this.model,
          contents: prompt,
          config: {
            temperature: 0.2,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
          },
        });

        const finishReason = response?.candidates?.[0]?.finishReason;

        logger.info(
          `Gemini Finish Reason: ${finishReason ?? "UNKNOWN"} | Model: ${this.model}`,
        );

        if (!response?.text) {
          throw new Error("Gemini returned an empty response.");
        }

        // Log response details
        JSONValidator.logResponseDetails(response.text, "Gemini");

        // Parse and validate JSON
        try {
          const parsedResponse = JSONValidator.parseAndValidate(response.text);

          logger.info(`Gemini JSON parsed successfully | Model: ${this.model}`);

          return parsedResponse;
        } catch (parseError) {
          logger.warn(
            `Gemini Invalid JSON (attempt ${attempt}/${MAX_RETRIES}) | Model: ${this.model}`,
          );
          logger.warn(`Parse Error: ${parseError.message}`);

          if (attempt === MAX_RETRIES) {
            throw new ApiError(
              502,
              "Gemini returned an invalid structured response.",
            );
          }
        }
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }

        logger.warn(
          `Gemini request failed (attempt ${attempt}/${MAX_RETRIES}) | Model: ${this.model}`,
        );
        logger.warn(error.message);

        if (attempt === MAX_RETRIES) {
          logger.error(
            `Gemini failed after ${MAX_RETRIES} attempts | Model: ${this.model}`,
          );
          logger.error(error.stack || error.message);

          throw new ApiError(502, "Gemini service is temporarily unavailable.");
        }

        // Exponential backoff before retry
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
      }
    }
  }
}

module.exports = GeminiProvider;
