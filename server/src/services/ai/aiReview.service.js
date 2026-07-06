const RepositoryAnalysisRepository = require("../../repositories/repositoryAnalysis.repository");
const GeminiProvider = require("./providers/gemini.provider");
const {
    buildRepositoryReviewPrompt,
} = require("./promptBuilder.service");
const engineeringHealthService = require("../engineeringHealth.service");

class AIReviewService {
    constructor() {
        this.repositoryAnalysisRepository =
            new RepositoryAnalysisRepository();

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

            pullRequestRisk:
                repositoryAnalysis.pullRequestAnalyses[0] ?? null,
        };
    }

    async generateRepositoryReview(repositoryId) {
        const repositoryAnalysis =
            await this.repositoryAnalysisRepository.getRepositoryAnalysis(
                repositoryId
            );

        const engineeringHealth =
            await engineeringHealthService.getEngineeringHealth(
                repositoryId
            );

        const analysis = this.buildAnalysisObject(
            repositoryAnalysis,
            engineeringHealth
        );

        const prompt = buildRepositoryReviewPrompt(analysis);

        const review =
            await this.provider.generateRepositoryReview(prompt);

        return review;
    }
}

module.exports = AIReviewService;