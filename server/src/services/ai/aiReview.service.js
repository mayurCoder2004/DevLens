const RepositoryAnalysisRepository = require("../../repositories/repositoryAnalysis.repository");
const RepositoryAIReviewRepository = require("../../repositories/repositoryAIReview.repository");

const GeminiProvider = require("./providers/gemini.provider");

const { buildRepositoryReviewPrompt } = require("./promptBuilder.service");

const engineeringHealthService = require("../engineeringHealth.service");

class AIReviewService {
  constructor() {
    this.repositoryAnalysisRepository = new RepositoryAnalysisRepository();

    this.repositoryAIReviewRepository = new RepositoryAIReviewRepository();

    this.provider = new GeminiProvider();
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

    const review = await this.provider.generateStructuredResponse(prompt);

    const savedReview = await this.repositoryAIReviewRepository.saveReview(
      repositoryId,
      review,
      this.provider.model,
    );

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

    const review = await this.provider.generateStructuredResponse(prompt);

    return await this.repositoryAIReviewRepository.saveReview(
      repositoryId,
      review,
      this.provider.model,
    );
  }
}

module.exports = AIReviewService;
