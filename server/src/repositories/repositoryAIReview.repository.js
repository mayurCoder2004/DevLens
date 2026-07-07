const prisma = require("../config/prisma");

class RepositoryAIReviewRepository {
  async saveReview(repositoryId, review, modelUsed) {
    const savedReview = await prisma.repositoryAIReview.upsert({
      where: {
        repositoryId,
      },
      update: {
        overallSummary: review.overallSummary,
        strengths: review.strengths,
        weaknesses: review.weaknesses,
        recommendations: review.recommendations,
        engineeringSummary: review.engineeringSummary,
        modelUsed,
      },
      create: {
        repositoryId,
        overallSummary: review.overallSummary,
        strengths: review.strengths,
        weaknesses: review.weaknesses,
        recommendations: review.recommendations,
        engineeringSummary: review.engineeringSummary,
        modelUsed,
      },
    });

    return savedReview;
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
