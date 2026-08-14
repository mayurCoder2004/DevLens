const prisma = require("../config/prisma");

const repositoryAccessMiddleware = async (
  req,
  res,
  next,
) => {
  try {
    const { repositoryId } = req.params;

    if (!repositoryId) {
      return res.status(400).json({
        success: false,
        message: "Repository ID is required",
      });
    }

    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const repository =
      await prisma.repository.findUnique({
        where: {
          id: repositoryId,
        },
        select: {
          id: true,
          userId: true,
        },
      });

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found",
      });
    }

    if (repository.userId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message:
          "You do not have access to this repository",
      });
    }

    req.repository = repository;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = repositoryAccessMiddleware;