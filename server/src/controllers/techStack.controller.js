const prisma = require("../config/prisma");
const techStackService = require("../services/techStack.service");

exports.analyzeTechStack = async (req, res) => {
  try {
    const repository = await prisma.repository.findUnique({
      where: {
        id: req.params.repoId,
      },
      include: {
        user: true,
      },
    });

    if (!repository) {
      return res.status(404).json({
        message: "Repository not found",
      });
    }

    const technologies = await techStackService.detect(
      repository,
      repository.user.githubToken,
    );

    const saved = await prisma.repositoryTechStack.upsert({
      where: {
        repositoryId: repository.id,
      },
      update: {
        technologies,
      },
      create: {
        repositoryId: repository.id,
        technologies,
      },
    });

    return res.json(saved);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTechStack = async (req, res) => {
  try {
    const data = await prisma.repositoryTechStack.findUnique({
      where: {
        repositoryId: req.params.repoId,
      },
    });

    return res.json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
