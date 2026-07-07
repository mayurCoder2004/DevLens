const prisma = require("../config/prisma");

class RepositoryAnalysisRepository {
  async getRepositoryAnalysis(repositoryId) {
    const repository = await prisma.repository.findUnique({
      where: {
        id: repositoryId,
      },
      include: {
        analytics: true,
        techStack: true,
        health: true,
        architecture: true,
        technicalDebt: true,
        deployment: true,
        pullRequestAnalyses: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
        aiReview: true,
      },
    });

    if (!repository) {
      throw new Error("Repository not found.");
    }

    return repository;
  }
}

module.exports = RepositoryAnalysisRepository;
