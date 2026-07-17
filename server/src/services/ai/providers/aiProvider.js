class AIProvider {
  async generateStructuredResponse(prompt) {
    throw new Error(
      "generateStructuredResponse() must be implemented."
    );
  }
}

module.exports = AIProvider;