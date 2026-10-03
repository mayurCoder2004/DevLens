const {
  getPublicRepository,
  getPublicRepositoryTree,
  getSourceFiles,
  getPublicSourceFiles,
} = require("../services/publicRepositoryGraph.service");

const {
  analyzePublicRepositoryDependencies,
} = require("../services/publicRepositoryDependency.service");

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

    const dependencyGraph =
      analyzePublicRepositoryDependencies(sourceContents);

    return res.status(200).json({
      success: true,
      repository,
      stats: {
        totalFiles: files.length,
        sourceFiles: sourceFiles.length,
        fetchedSourceFiles: sourceContents.length,
        graphNodes: dependencyGraph.nodes.length,
        graphEdges: dependencyGraph.edges.length,
      },
      files,
      sourceFiles: sourceContents,
      graph: {
        nodes: dependencyGraph.nodes,
        edges: dependencyGraph.edges,
      },
      dependencies: dependencyGraph.dependencies,
    });
  } catch (error) {
    console.error(
      "Public repository graph analysis error:",
      error.message,
    );

    if (error.message.includes("Invalid GitHub repository URL")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "GitHub repository or repository tree not found.",
      });
    }

    if (error.message.includes("too large")) {
      return res.status(413).json({
        success: false,
        message: error.message,
      });
    }

    if (error.response?.status === 403) {
      return res.status(429).json({
        success: false,
        message:
          "GitHub API rate limit reached. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to analyze public repository.",
    });
  }
};

module.exports = {
  analyzePublicRepository,
};
