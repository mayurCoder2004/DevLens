const {
  getPublicRepository,
  getPublicRepositoryTree,
  getPublicFileContent,
} = require("../services/publicRepositoryGraph.service");

const {
  expandDependencyFiles,
  analyzePublicRepositoryDependencies,
} = require("../services/publicRepositoryDependency.service");

const {
  buildPublicRepositoryGraph,
} = require("../services/publicRepositoryGraphBuilder.service");

const analyzePublicRepository = async (req, res) => {
  try {
    const { repositoryUrl } = req.body;

    if (!repositoryUrl || typeof repositoryUrl !== "string") {
      return res.status(400).json({
        success: false,
        message: "A GitHub repository URL is required.",
      });
    }

    // 1. Fetch repository metadata
    const repository = await getPublicRepository(repositoryUrl);

    // 2. Fetch the complete repository tree
    const files = await getPublicRepositoryTree(
      repository.owner,
      repository.name,
      repository.defaultBranch,
    );

    // 3. Fetch source files based on dependency discovery
    const sourceFiles = await expandDependencyFiles({
      owner: repository.owner,
      repo: repository.name,
      defaultBranch: repository.defaultBranch,
      files,
      getFileContent: getPublicFileContent,
    });

    // 4. Analyze imports and resolve local dependencies
    const dependencyAnalysis =
      analyzePublicRepositoryDependencies(sourceFiles);

    // 5. Convert dependency analysis into graph data
    const graph = buildPublicRepositoryGraph(
      dependencyAnalysis,
    );

    return res.status(200).json({
      success: true,

      repository,

      stats: {
        totalFiles: files.length,
        fetchedSourceFiles: sourceFiles.length,
        graphNodes: graph.nodes.length,
        graphEdges: graph.edges.length,
      },

      files,

      sourceFiles,

      graph,

      dependencies:
        dependencyAnalysis.dependencies,
    });
  } catch (error) {
    console.error(
      "Public repository graph analysis error:",
      error.message,
    );

    if (
      error.message.includes(
        "Invalid GitHub repository URL",
      )
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message:
          "GitHub repository or repository tree not found.",
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
