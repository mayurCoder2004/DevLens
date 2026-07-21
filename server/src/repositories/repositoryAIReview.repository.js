const prisma = require("../config/prisma");

class RepositoryAIReviewRepository {
  async saveReview(repositoryId, review, modelUsed) {
    return prisma.repositoryAIReview.upsert({
      where: {
        repositoryId,
      },
      update: {
        review,
        modelUsed,
        promptVersion: "v2",
      },
      create: {
        repositoryId,
        review,
        modelUsed,
        promptVersion: "v2",
      },
    });
  }

  async getReviewByRepositoryId(repositoryId) {
    return prisma.repositoryAIReview.findUnique({
      where: {
        repositoryId,
      },
    });
  }

  async deleteReview(repositoryId) {
    return prisma.repositoryAIReview.delete({
      where: {
        repositoryId,
      },
    });
  }
}

module.exports = RepositoryAIReviewRepository;