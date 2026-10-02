const {
  getPublicRepository,
  getPublicRepositoryTree,
  getSourceFiles,
  getPublicSourceFiles,
} = require("../services/publicRepositoryGraph.service");

const analyzePublicRepository = async (req, res) => {
  try {
    const { repositoryUrl } = req.body;

    if (!repositoryUrl || typeof repositoryUrl !== "string") {
      return res.status(400).json({
        success: false,
        message: "A GitHub repository URL is required.",
      });
    }

    const repository = await getPublicRepository(repositoryUrl);

    const files = await getPublicRepositoryTree(
      repository.owner,
      repository.name,
      repository.defaultBranch,
    );

    const sourceFiles = getSourceFiles(files);

    const sourceContents = await getPublicSourceFiles(
      repository.owner,
      repository.name,
      repository.defaultBranch,
      files,
    );

    return res.status(200).json({
      success: true,
      repository,
      stats: {
        totalFiles: files.length,
        sourceFiles: sourceFiles.length,
        fetchedSourceFiles: sourceContents.length,
      },
      files,
      sourceFiles: sourceContents,
    });
  } catch (error) {
    console.error(
      "Public repository graph analysis error:",
      error.message,
    );

    if (
      error.message === "Only GitHub repository URLs are supported." ||
      error.message === "Invalid GitHub repository URL."
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Public GitHub repository not found.") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Repository tree could not be found.") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message ===
      "Repository is too large to analyze completely."
    ) {
      return res.status(413).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "GitHub API rate limit exceeded.") {
      return res.status(429).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to analyze repository.",
    });
  }
};

module.exports = {
  analyzePublicRepository,
};
