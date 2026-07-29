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

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await this.client.models.generateContent({
          model: this.model,
          contents: prompt,
          config: {
            temperature: 0.2,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
          },
        });

        const finishReason =
          response?.candidates?.[0]?.finishReason;

        logger.info(
          `Gemini Finish Reason: ${finishReason ?? "UNKNOWN"}`
        );

        if (!response?.text) {
          throw new Error("Gemini returned an empty response.");
        }

        const cleanedResponse = response.text
          .replace(/```json\s*/gi, "")
          .replace(/```\s*/g, "")
          .trim();
        
        logger.info(
  `Response Length: ${cleanedResponse.length}`
);

logger.info(
  `Last 500 Characters:\n${cleanedResponse.slice(-500)}`
);

        if (
          !cleanedResponse.startsWith("{") ||
          !cleanedResponse.endsWith("}")
        ) {
          throw new Error("Incomplete JSON response.");
        }

        try {
          const parsedResponse = JSON.parse(cleanedResponse);

          logger.info("JSON parsed successfully.");

          return parsedResponse;
        } catch (parseError) {
          logger.warn(
            `Invalid JSON received (attempt ${attempt}/${MAX_RETRIES})`
          );

          logger.warn(parseError.message);

          logger.debug(cleanedResponse);

          if (attempt === MAX_RETRIES) {
            throw new ApiError(
              502,
              "AI returned an invalid structured response."
            );
          }
        }
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }

        logger.warn(
          `Gemini request failed (attempt ${attempt}/${MAX_RETRIES})`
        );

        logger.warn(error.message);

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
  }
}

module.exports = GeminiProvider;