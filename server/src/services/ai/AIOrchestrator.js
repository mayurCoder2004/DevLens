const GeminiProvider = require("./providers/gemini.provider");
const OpenRouterProvider = require("./providers/openrouter.provider");
const env = require("../../config/env");
const logger = require("../../config/logger");
const ApiError = require("../../utils/ApiError");

/**
 * AIOrchestrator
 * 
 * Manages multiple AI providers with automatic fallback.
 * Tries providers in order: Gemini → OpenRouter (Primary) → OpenRouter (Secondary)
 * 
 * Higher-level services remain unaware of which provider generates the response.
 * 
 * Usage:
 *   const AIProviderFactory = require("./AIProviderFactory");
 *   const provider = AIProviderFactory.getOrchestrator();
 *   const response = await provider.generateStructuredResponse(prompt);
 * 
 * Fallback Order:
 *   1. Gemini (gemini-2.5-flash)
 *   2. OpenRouter - Qwen (qwen/qwen-2.5-coder-32b-instruct:free)
 *   3. OpenRouter - Llama (meta-llama/llama-3.3-70b-instruct:free)
 *   4. Error: 502 "All AI providers are currently unavailable"
 */
class AIOrchestrator {
  constructor() {
    this.providers = this._initializeProviders();
  }

  /**
   * Initialize AI providers in fallback order
   * @private
   * @returns {Array} Array of provider objects with metadata
   */
  _initializeProviders() {
    const providers = [];

    // Primary: Gemini
    try {
      providers.push({
        name: "Gemini",
        model: env.GEMINI_MODEL,
        instance: new GeminiProvider(),
        priority: 1,
      });
      logger.info(`✓ Gemini Provider initialized | Model: ${env.GEMINI_MODEL}`);
    } catch (error) {
      logger.warn(`✗ Gemini Provider initialization failed: ${error.message}`);
    }

    // Fallback 1: OpenRouter Primary Model
    if (env.OPENROUTER_API_KEY) {
      try {
        providers.push({
          name: "OpenRouter",
          model: env.OPENROUTER_MODEL_PRIMARY,
          instance: new OpenRouterProvider(env.OPENROUTER_MODEL_PRIMARY),
          priority: 2,
        });
        logger.info(
          `✓ OpenRouter Primary Provider initialized | Model: ${env.OPENROUTER_MODEL_PRIMARY}`
        );
      } catch (error) {
        logger.warn(
          `✗ OpenRouter Primary Provider initialization failed: ${error.message}`
        );
      }

      // Fallback 2: OpenRouter Secondary Model
      try {
        providers.push({
          name: "OpenRouter",
          model: env.OPENROUTER_MODEL_SECONDARY,
          instance: new OpenRouterProvider(env.OPENROUTER_MODEL_SECONDARY),
          priority: 3,
        });
        logger.info(
          `✓ OpenRouter Secondary Provider initialized | Model: ${env.OPENROUTER_MODEL_SECONDARY}`
        );
      } catch (error) {
        logger.warn(
          `✗ OpenRouter Secondary Provider initialization failed: ${error.message}`
        );
      }
    } else {
      logger.warn(
        "⚠ OpenRouter API Key not configured. Fallback providers unavailable."
      );
    }

    if (providers.length === 0) {
      throw new Error(
        "No AI providers available. Please configure at least one provider."
      );
    }

    logger.info(`AI Orchestrator initialized with ${providers.length} provider(s)`);

    return providers;
  }

  /**
   * Generate structured response with automatic provider fallback
   * @param {string} prompt - The prompt to send to the AI model
   * @returns {Promise<Object>} Parsed JSON response from the AI provider
   * @throws {ApiError} If all providers fail
   */
  async generateStructuredResponse(prompt) {
    const startTime = Date.now();
    const errors = [];

    for (const provider of this.providers) {
      const providerStartTime = Date.now();

      try {
        logger.info(
          `→ Attempting Provider: ${provider.name} | Model: ${provider.model} | Priority: ${provider.priority}`
        );

        const response = await provider.instance.generateStructuredResponse(prompt);

        const latency = Date.now() - providerStartTime;
        const totalLatency = Date.now() - startTime;

        logger.info(
          `✓ Success | Provider: ${provider.name} | Model: ${provider.model} | Latency: ${latency}ms | Total: ${totalLatency}ms`
        );

        // Log successful provider for analytics
        this._logProviderSuccess(provider, latency, errors.length);

        return response;
      } catch (error) {
        const latency = Date.now() - providerStartTime;

        logger.warn(
          `✗ Failed | Provider: ${provider.name} | Model: ${provider.model} | Latency: ${latency}ms | Error: ${error.message}`
        );

        errors.push({
          provider: provider.name,
          model: provider.model,
          priority: provider.priority,
          error: error.message,
          latency,
        });

        // Continue to next provider
        continue;
      }
    }

    // All providers failed
    const totalLatency = Date.now() - startTime;

    logger.error(
      `✗ All AI providers failed | Total Latency: ${totalLatency}ms | Providers Tried: ${errors.length}`
    );

    errors.forEach((err) => {
      logger.error(
        `  - ${err.provider} (${err.model}): ${err.error} [${err.latency}ms]`
      );
    });

    throw new ApiError(
      502,
      "All AI providers are currently unavailable. Please try again later."
    );
  }

  /**
   * Log successful provider usage for analytics
   * @private
   */
  _logProviderSuccess(provider, latency, failedAttempts) {
    logger.info("AI Provider Success Analytics:", {
      provider: provider.name,
      model: provider.model,
      priority: provider.priority,
      latency: `${latency}ms`,
      failedAttempts,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Get available providers (for debugging/monitoring)
   * @returns {Array} List of available providers
   */
  getAvailableProviders() {
    return this.providers.map((p) => ({
      name: p.name,
      model: p.model,
      priority: p.priority,
    }));
  }
}

module.exports = AIOrchestrator;
