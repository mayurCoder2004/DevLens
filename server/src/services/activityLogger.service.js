const prisma = require("../config/prisma");

/**
 * Creates an activity record for the dashboard timeline.
 *
 * If repositoryId is provided, the repository and user
 * are automatically resolved.
 */

const logActivity = async ({
  repositoryId = null,
  userId = null,
  type,
  title,
  description = null,
  metadata = null,
}) => {
  try {
    let resolvedUserId = userId;

    if (repositoryId) {
      const repository = await prisma.repository.findUnique({
        where: {
          id: repositoryId,
        },
        select: {
          id: true,
          userId: true,
          name: true,
        },
      });

      if (!repository) {
        throw new Error("Repository not found.");
      }

      resolvedUserId = repository.userId;
    }

    if (!resolvedUserId) {
      throw new Error("Either userId or repositoryId must be provided.");
    }

    return await prisma.activity.create({
      data: {
        userId: resolvedUserId,
        repositoryId,
        type,
        title,
        description,
        metadata,
      },
    });
  } catch (error) {
    console.error("Failed to log activity:", error.message);

    // Never break the main feature because activity logging failed.
    return null;
  }
};

module.exports = {
  logActivity,
};
