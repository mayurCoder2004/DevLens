const RepositoryAnalysisRepository = require("../../repositories/repositoryAnalysis.repository");
const RepositoryAIReviewRepository = require("../../repositories/repositoryAIReview.repository");
const { logActivity } = require("../activityLogger.service");

const AIProviderFactory = require("./AIProviderFactory");

const { buildRepositoryReviewPrompt } = require("./promptBuilder.service");

const engineeringHealthService = require("../engineeringHealth.service");
const logger = require("../../config/logger");

class AIReviewService {
  constructor() {
    this.repositoryAnalysisRepository = new RepositoryAnalysisRepository();

    this.repositoryAIReviewRepository = new RepositoryAIReviewRepository();

    // Use AI Orchestrator with automatic fallback
    this.provider = AIProviderFactory.getOrchestrator();
  }

  buildAnalysisObject(repositoryAnalysis, engineeringHealth) {
    return {
      repository: repositoryAnalysis,

      engineeringHealth,

      repositoryHealth: repositoryAnalysis.health,

      architecture: repositoryAnalysis.architecture,

      technicalDebt: repositoryAnalysis.technicalDebt,

      deployment: repositoryAnalysis.deployment,

      pullRequestRisk: repositoryAnalysis.pullRequestAnalyses[0] ?? null,
    };
  }

  async generateRepositoryReview(repositoryId) {
    const existingReview =
      await this.repositoryAIReviewRepository.getReviewByRepositoryId(
        repositoryId,
      );

    if (existingReview) {
      return existingReview;
    }

    const repositoryAnalysis =
      await this.repositoryAnalysisRepository.getRepositoryAnalysis(
        repositoryId,
      );

    const engineeringHealth =
      await engineeringHealthService.getEngineeringHealth(repositoryId);

    const analysis = this.buildAnalysisObject(
      repositoryAnalysis,
      engineeringHealth,
    );

    const prompt = buildRepositoryReviewPrompt(analysis);

    logger.info(
      `Generating AI review | Prompt length: ${prompt.length} characters`,
    );

    const review = await this.provider.generateStructuredResponse(prompt);

    logger.info("AI review generated successfully.");

    // Note: provider.model is not available in orchestrator
    // The orchestrator automatically selects the best available provider
    const savedReview = await this.repositoryAIReviewRepository.saveReview(
      repositoryId,
      review,
      "AI Orchestrator", // Generic label since orchestrator manages providers
    );

    await logActivity({
      repositoryId,
      type: "AI_REVIEW",
      title: "AI Review Generated",
      description: `Repository analyzed using AI Orchestrator with automatic provider fallback.`,
      metadata: {
        system: "AI Orchestrator",
      },
    });

    return savedReview;
  }

  async getRepositoryReview(repositoryId) {
    return await this.repositoryAIReviewRepository.getReviewByRepositoryId(
      repositoryId,
    );
  }

  async refreshRepositoryReview(repositoryId) {
    const repositoryAnalysis =
      await this.repositoryAnalysisRepository.getRepositoryAnalysis(
        repositoryId,
      );

    const engineeringHealth =
      await engineeringHealthService.getEngineeringHealth(repositoryId);

    const analysis = this.buildAnalysisObject(
      repositoryAnalysis,
      engineeringHealth,
    );

    const prompt = buildRepositoryReviewPrompt(analysis);

    logger.info(
      `Refreshing AI review | Prompt length: ${prompt.length} characters`,
    );

    const review = await this.provider.generateStructuredResponse(prompt);

    const savedReview = await this.repositoryAIReviewRepository.saveReview(
      repositoryId,
      review,
      "AI Orchestrator",
    );

    await logActivity({
      repositoryId,
      type: "AI_REVIEW",
      title: "AI Review Refreshed",
      description: `Repository review regenerated using AI Orchestrator with automatic provider fallback.`,
      metadata: {
        system: "AI Orchestrator",
      },
    });

    return savedReview;
  }
}

module.exports = AIReviewService;
