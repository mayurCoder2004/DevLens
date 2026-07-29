const prisma = require("../config/prisma");
const logger = require("../config/logger");

class RepositoryAIReviewRepository {
  async saveReview(repositoryId, review, modelUsed) {
    try {
      logger.info("Saving AI review to database...");
      logger.info(`Repository ID: ${repositoryId}`);
      logger.info(`Model: ${modelUsed}`);
      logger.info(`Review Type: ${typeof review}`);

      const savedReview = await prisma.repositoryAIReview.upsert({
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

      logger.info("AI review saved successfully.");

      return savedReview;
    } catch (error) {
      logger.error("Failed to save AI review:");
      logger.error(error);

      throw error;
    }
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