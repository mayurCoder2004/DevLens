const AIOrchestrator = require("./AIOrchestrator");

/**
 * AIProviderFactory
 *
 * Factory pattern for creating AI provider instances.
 * Provides a singleton orchestrator instance to ensure consistent provider management.
 */
class AIProviderFactory {
  constructor() {
    this.orchestrator = null;
  }

  /**
   * Get the AI Orchestrator instance (Singleton)
   * @returns {AIOrchestrator} The AI orchestrator instance
   */
  getOrchestrator() {
    if (!this.orchestrator) {
      this.orchestrator = new AIOrchestrator();
    }

    return this.orchestrator;
  }

  /**
   * Reset the orchestrator (useful for testing)
   */
  reset() {
    this.orchestrator = null;
  }
}

// Export singleton instance
module.exports = new AIProviderFactory();
