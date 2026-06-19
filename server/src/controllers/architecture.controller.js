const prisma = require("../config/prisma");

const repositoryScanner = require("../services/architecture/repositoryScanner");

const testScanner = async (req, res) => {
  try {
    const repository = await prisma.repository.findFirst({
      include: {
        user: true,
      },
    });

    if (!repository) {
      return res.status(404).json({
        message: "No repository found",
      });
    }

    const files = await repositoryScanner.getAllRepositoryFiles(
      repository.owner,
      repository.name,
      repository.user.githubToken,
    );

    return res.json({
      totalFiles: files.length,
      files,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  testScanner,
};
