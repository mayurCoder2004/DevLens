const axios = require("axios");
const AIProvider = require("./aiProvider");
const env = require("../../../config/env");
const logger = require("../../../config/logger");
const ApiError = require("../../../utils/ApiError");
const JSONValidator = require("../utils/jsonValidator");

const MAX_PROMPT_LENGTH = 50000;
const MAX_RETRIES = 2;
const TIMEOUT_MS = 60000; // 60 seconds

class OpenRouterProvider extends AIProvider {
  constructor(modelName) {
    super();

    if (!modelName) {
      throw new Error("OpenRouter model name is required");
    }

    this.apiKey = env.OPENROUTER_API_KEY;
    this.baseURL = env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
    this.model = modelName;
    this.providerName = "OpenRouter";

    if (!this.apiKey) {
      throw new Error("OPENROUTER_API_KEY is not configured");
    }
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
        logger.info(
          `OpenRouter Request | Model: ${this.model} | Attempt: ${attempt}/${MAX_RETRIES}`
        );

        const response = await axios.post(
          `${this.baseURL}/chat/completions`,
          {
            model: this.model,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.2,
            max_tokens: 8192,
            response_format: {
              type: "json_object",
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer": env.CLIENT_URL || "http://localhost:5173",
              "X-Title": "DevLens",
            },
            timeout: TIMEOUT_MS,
          }
        );

        const content = response.data?.choices?.[0]?.message?.content;
        const finishReason = response.data?.choices?.[0]?.finish_reason;

        logger.info(
          `OpenRouter Finish Reason: ${finishReason || "UNKNOWN"} | Model: ${this.model}`
        );

        if (!content) {
          throw new Error("OpenRouter returned an empty response.");
        }

        // Log response details
        JSONValidator.logResponseDetails(content, "OpenRouter");

        // Parse and validate JSON
        try {
          const parsedResponse = JSONValidator.parseAndValidate(content);

          logger.info(
            `OpenRouter JSON parsed successfully | Model: ${this.model}`
          );

          return parsedResponse;
        } catch (parseError) {
          logger.warn(
            `OpenRouter Invalid JSON (attempt ${attempt}/${MAX_RETRIES}) | Model: ${this.model}`
          );
          logger.warn(`Parse Error: ${parseError.message}`);

          if (attempt === MAX_RETRIES) {
            throw new ApiError(
              502,
              "OpenRouter returned an invalid structured response."
            );
          }
        }
      } catch (error) {
        // If it's already an ApiError, throw it
        if (error instanceof ApiError) {
          throw error;
        }

        // Handle axios errors
        if (error.response) {
          const status = error.response.status;
          const errorMsg = error.response.data?.error?.message || error.message;

          logger.warn(
            `OpenRouter HTTP ${status} (attempt ${attempt}/${MAX_RETRIES}) | Model: ${this.model}`
          );
          logger.warn(`Error: ${errorMsg}`);

          // Don't retry on quota exceeded or authentication errors
          if (status === 429 || status === 401 || status === 403) {
            throw new ApiError(
              502,
              `OpenRouter error: ${errorMsg}`
            );
          }
        } else {
          logger.warn(
            `OpenRouter request failed (attempt ${attempt}/${MAX_RETRIES}) | Model: ${this.model}`
          );
          logger.warn(error.message);
        }

        // Last attempt failed
        if (attempt === MAX_RETRIES) {
          logger.error(
            `OpenRouter failed after ${MAX_RETRIES} attempts | Model: ${this.model}`
          );
          logger.error(error.stack || error.message);

          throw new ApiError(
            502,
            "OpenRouter service is temporarily unavailable."
          );
        }

        // Exponential backoff before retry
        await new Promise((resolve) =>
          setTimeout(resolve, attempt * 1000)
        );
      }
    }
  }
}

module.exports = OpenRouterProvider;
