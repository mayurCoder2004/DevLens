const logger = require("../../../config/logger");

/**
 * Utility functions for validating and cleaning AI-generated JSON responses
 */
class JSONValidator {
  /**
   * Clean markdown artifacts from AI response
   * @param {string} response - Raw AI response string
   * @returns {string} Cleaned response
   */
  static cleanMarkdown(response) {
    if (!response || typeof response !== "string") {
      throw new Error("Response must be a non-empty string");
    }

    return response
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();
  }

  /**
   * Validate JSON structure (basic checks)
   * @param {string} jsonString - JSON string to validate
   * @returns {boolean} True if structure looks valid
   */
  static isValidJSONStructure(jsonString) {
    if (!jsonString) {
      return false;
    }

    const trimmed = jsonString.trim();

    // Check if it starts and ends with proper JSON delimiters
    const isObject = trimmed.startsWith("{") && trimmed.endsWith("}");
    const isArray = trimmed.startsWith("[") && trimmed.endsWith("]");

    return isObject || isArray;
  }

  /**
   * Parse and validate JSON response
   * @param {string} response - Raw AI response
   * @returns {Object} Parsed JSON object
   * @throws {Error} If JSON is invalid
   */
  static parseAndValidate(response) {
    // Clean markdown artifacts
    const cleaned = this.cleanMarkdown(response);

    // Validate structure
    if (!this.isValidJSONStructure(cleaned)) {
      logger.warn("Invalid JSON structure detected");
      logger.debug(`Response preview: ${cleaned.slice(0, 200)}...`);
      throw new Error("Response is not valid JSON");
    }

    // Parse JSON
    try {
      const parsed = JSON.parse(cleaned);
      logger.debug("JSON parsed successfully");
      return parsed;
    } catch (error) {
      logger.warn(`JSON parse error: ${error.message}`);
      logger.debug(`Failed response: ${cleaned.slice(0, 500)}`);
      throw new Error(`Failed to parse JSON: ${error.message}`);
    }
  }

  /**
   * Log response details for debugging
   * @param {string} response - Response to log
   * @param {string} provider - Provider name
   */
  static logResponseDetails(response, provider) {
    logger.info(`${provider} Response Length: ${response.length} characters`);
    logger.debug(`${provider} Response Preview: ${response.slice(0, 200)}...`);
    logger.debug(`${provider} Response Ending: ...${response.slice(-200)}`);
  }
}

module.exports = JSONValidator;
