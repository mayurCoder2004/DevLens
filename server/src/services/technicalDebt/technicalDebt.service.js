const repositoryScanner = require("../architecture/repositoryScanner");
const fileDownloader = require("../architecture/fileDownloader");
const architectureAnalyzer = require("../architecture/architectureAnalyzer");
const prisma = require("../../config/prisma");

const LARGE_FILE_THRESHOLD = 500;

async function detectLargeFiles(files) {
  const largeFiles = [];

  for (const file of files) {
    try {
      const content = await fileDownloader.downloadFileContent(
        file.downloadUrl
      );

      const lines = content.split("\n").length;

      if (lines > LARGE_FILE_THRESHOLD) {
        largeFiles.push({
          file: file.path,
          lines,
        });
      }
    } catch (error) {
      console.error(
        `Failed to analyze ${file.path}`,
        error.message
      );
    }
  }

  return largeFiles;
}

function detectDeadFiles(graph) {
  const incomingCount = {};

  for (const node of graph.nodes) {
    incomingCount[node.id] = 0;
  }

  for (const edge of graph.edges) {
    incomingCount[edge.target] =
      (incomingCount[edge.target] || 0) + 1;
  }

  const entryFiles = [
    "main.jsx",
    "App.jsx",
    "server.js",
    "index.js",
  ];

  return graph.nodes
    .filter(
      (node) =>
        incomingCount[node.id] === 0 &&
        !entryFiles.includes(node.id)
    )
    .map((node) => node.id);
}

function detectDeepDependencyChains(graph) {
  const MAX_ALLOWED_DEPTH = 4;

  const adjacency = {};

  for (const node of graph.nodes) {
    adjacency[node.id] = [];
  }

  for (const edge of graph.edges) {
    adjacency[edge.source].push(edge.target);
  }

  const deepChains = [];

  function dfs(node, path) {
    const currentPath = [...path, node];

    if (currentPath.length > MAX_ALLOWED_DEPTH) {
      deepChains.push({
        depth: currentPath.length,
        chain: currentPath,
      });
    }

    for (const neighbor of adjacency[node] || []) {
      if (!currentPath.includes(neighbor)) {
        dfs(neighbor, currentPath);
      }
    }
  }

  for (const node of graph.nodes) {
    dfs(node.id, []);
  }

  return deepChains;
}

function calculateTechnicalDebtScore({
  largeFiles,
  deadFiles,
  deepChains,
  circularDependencyCount,
}) {
  let score = 100;

  score -= largeFiles.length * 3;
  score -= deadFiles.length * 2;
  score -= deepChains.length * 5;
  score -= circularDependencyCount * 10;

  return Math.max(0, score);
}

function calculateMaintainabilityScore(
  technicalDebtScore
) {
  return Math.min(
    100,
    technicalDebtScore + 20
  );
}

function generateRecommendations({
  largeFiles,
  deadFiles,
  deepChains,
  circularDependencyCount,
}) {
  const recommendations = [];

  if (largeFiles.length > 0) {
    recommendations.push(
      "Split large files into smaller modules and components"
    );
  }

  if (deadFiles.length > 0) {
    recommendations.push(
      "Remove unused or dead files from the codebase"
    );
  }

  if (deepChains.length > 0) {
    recommendations.push(
      "Reduce dependency depth by simplifying module relationships"
    );
  }

  if (circularDependencyCount > 0) {
    recommendations.push(
      "Refactor circular dependencies to improve maintainability"
    );
  }

  return recommendations;
}

async function analyzeTechnicalDebt(
  owner,
  repo,
  githubToken
) {
  const files =
    await repositoryScanner.getAllRepositoryFiles(
      owner,
      repo,
      githubToken
    );

  const graph =
    await architectureAnalyzer.analyze(
      owner,
      repo,
      githubToken
    );

  const largeFiles =
    await detectLargeFiles(files);

  const deadFiles =
    detectDeadFiles(graph);

  const deepChains =
    detectDeepDependencyChains(graph);

  // Phase 3 currently only stores a boolean
  // We'll improve this later if needed
  const circularDependencyCount = 0;

  const technicalDebtScore =
    calculateTechnicalDebtScore({
      largeFiles,
      deadFiles,
      deepChains,
      circularDependencyCount,
    });

  const maintainabilityScore =
    calculateMaintainabilityScore(
      technicalDebtScore
    );

  const recommendations =
    generateRecommendations({
      largeFiles,
      deadFiles,
      deepChains,
      circularDependencyCount,
    });

  return {
    technicalDebtScore,
    maintainabilityScore,

    largeFileCount: largeFiles.length,
    deadFileCount: deadFiles.length,
    circularDependencyCount,
    deepDependencyChainCount:
      deepChains.length,

    largeFiles,
    deadFiles,
    deepDependencyChains:
      deepChains,

    recommendations,
  };
}

async function saveTechnicalDebt(
  repositoryId,
  report
) {
  return prisma.repositoryTechnicalDebt.upsert({
    where: {
      repositoryId,
    },
    update: {
      technicalDebtScore: report.technicalDebtScore,
      maintainabilityScore: report.maintainabilityScore,

      largeFileCount: report.largeFileCount,
      deadFileCount: report.deadFileCount,
      circularDependencyCount:
        report.circularDependencyCount,
      deepDependencyChainCount:
        report.deepDependencyChainCount,

      largeFiles: report.largeFiles,
      deadFiles: report.deadFiles,
      deepDependencyChains:
        report.deepDependencyChains,

      recommendations:
        report.recommendations,
    },

    create: {
      repositoryId,

      technicalDebtScore:
        report.technicalDebtScore,
      maintainabilityScore:
        report.maintainabilityScore,

      largeFileCount:
        report.largeFileCount,
      deadFileCount:
        report.deadFileCount,
      circularDependencyCount:
        report.circularDependencyCount,
      deepDependencyChainCount:
        report.deepDependencyChainCount,

      largeFiles:
        report.largeFiles,
      deadFiles:
        report.deadFiles,
      deepDependencyChains:
        report.deepDependencyChains,

      recommendations:
        report.recommendations,
    },
  });
}

module.exports = {
  detectLargeFiles,
  detectDeadFiles,
  detectDeepDependencyChains,

  calculateTechnicalDebtScore,
  calculateMaintainabilityScore,

  generateRecommendations,

  analyzeTechnicalDebt,
  saveTechnicalDebt
};