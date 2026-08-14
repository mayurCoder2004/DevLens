const {
  findAffectedFiles,
} = require("./dependencyImpact.service");

const {
  detectAffectedAreas,
} = require("./impactAreas.service");

const {
  calculateImpactScore,
} = require("./impactScoring.service");

const {
  generateImpactRecommendations,
} = require("./impactRecommendation.service");

const DEFAULT_MAX_DEPTH = 5;

/**
 * Normalize a repository file path.
 */
const normalizePath = (filePath) => {
  if (!filePath || typeof filePath !== "string") {
    return "";
  }

  return filePath
    .replace(/\\/g, "/")
    .replace(/^\.\/+/, "")
    .trim();
};

/**
 * Extract the filename from a repository path.
 *
 * Example:
 * src/auth/auth.service.js
 * -> auth.service.js
 */
const getBaseName = (filePath) => {
  const normalized = normalizePath(filePath);

  if (!normalized) {
    return "";
  }

  return normalized.split("/").pop();
};

/**
 * Resolve a GitHub changed-file path to an architecture
 * graph node.
 *
 * The current architecture graph stores node IDs using
 * file names rather than complete repository paths.
 */
const resolveGraphNode = (filePath, graph = {}) => {
  const normalizedPath = normalizePath(filePath);

  if (!normalizedPath) {
    return null;
  }

  const nodes = Array.isArray(graph.nodes)
    ? graph.nodes
    : [];

  const nodeIds = nodes
    .map((node) => node?.id)
    .filter(Boolean);

  // Exact match first.
  if (nodeIds.includes(normalizedPath)) {
    return normalizedPath;
  }

  const baseName = getBaseName(normalizedPath);

  if (!baseName) {
    return null;
  }

  // Current Architecture Engine stores file names.
  const matches = nodeIds.filter(
    (nodeId) => nodeId === baseName,
  );

  // We can safely resolve only when there is exactly
  // one matching node.
  if (matches.length === 1) {
    return matches[0];
  }

  return null;
};

/**
 * Resolve all changed files against the architecture graph.
 */
const resolveChangedFiles = (
  changedFiles = [],
  graph = {},
) => {
  const resolved = [];
  const unresolved = [];

  for (const file of changedFiles) {
    const path =
      typeof file === "string"
        ? file
        : file?.filename;

    const normalizedPath = normalizePath(path);

    if (!normalizedPath) {
      continue;
    }

    const graphNode = resolveGraphNode(
      normalizedPath,
      graph,
    );

    if (graphNode) {
      resolved.push({
        path: normalizedPath,
        graphNode,
      });
    } else {
      unresolved.push(normalizedPath);
    }
  }

  return {
    resolved,
    unresolved,
  };
};

/**
 * Determine whether a file belongs to the critical
 * classification.
 */
const isCriticalFile = (
  filePath,
  criticalFiles = [],
) => {
  const normalizedPath = normalizePath(filePath);

  if (!normalizedPath) {
    return false;
  }

  const baseName = getBaseName(normalizedPath);

  return criticalFiles.some((criticalFile) => {
    const normalizedCritical =
      normalizePath(criticalFile);

    return (
      normalizedCritical === normalizedPath ||
      normalizedCritical === baseName ||
      getBaseName(normalizedCritical) === baseName
    );
  });
};

/**
 * Build the complete Change Impact analysis.
 */
const analyzeChangeImpact = ({
  graph = {},
  changedFiles = [],
  criticalFiles = [],
  maxDepth = DEFAULT_MAX_DEPTH,
} = {}) => {
  const {
    resolved,
    unresolved,
  } = resolveChangedFiles(
    changedFiles,
    graph,
  );

  const resolvedGraphNodes = resolved.map(
    (item) => item.graphNode,
  );

  // --------------------------------------------
  // Dependency Impact
  // --------------------------------------------

  const dependencyImpact =
    findAffectedFiles(
      graph,
      resolvedGraphNodes,
      maxDepth,
    );

  // --------------------------------------------
  // Build area input
  // --------------------------------------------

  const areaFiles = [
    ...resolved.map((item) => ({
      file: item.path,
      depth: 0,
    })),

    ...dependencyImpact.affectedFiles.map(
      (item) => ({
        file: item.file,
        depth: item.depth,
      }),
    ),

    ...unresolved.map((file) => ({
      file,
      depth: 0,
    })),
  ];

  // --------------------------------------------
  // Affected Areas
  // --------------------------------------------

  const affectedAreas =
    detectAffectedAreas(areaFiles);

  // --------------------------------------------
  // Critical affected files
  // --------------------------------------------

  const impactedFilePaths = [
    ...resolved.map((item) => item.path),
    ...dependencyImpact.affectedFiles.map(
      (item) => item.file,
    ),
  ];

  const criticalAffectedFiles =
    impactedFilePaths.filter((file) =>
      isCriticalFile(
        file,
        criticalFiles,
      ),
    );

  // --------------------------------------------
  // Impact Score
  // --------------------------------------------

  const impactScore =
    calculateImpactScore({
      changedFileCount:
        changedFiles.length,

      affectedFileCount:
        dependencyImpact.affectedFileCount,

      criticalAffectedFileCount:
        criticalAffectedFiles.length,

      maxDependencyDepth:
        dependencyImpact.maxDepth,
    });

  // --------------------------------------------
  // Recommendations
  // --------------------------------------------

  const recommendations =
    generateImpactRecommendations(
      affectedAreas,
    );

  return {
    score: impactScore.score,
    level: impactScore.level,

    breakdown: impactScore.breakdown,

    metrics: {
      changedFileCount:
        changedFiles.length,

      affectedFileCount:
        dependencyImpact.affectedFileCount,

      criticalAffectedFileCount:
        criticalAffectedFiles.length,

      maxDependencyDepth:
        dependencyImpact.maxDepth,

      unresolvedFileCount:
        unresolved.length,
    },

    changedFiles: changedFiles.map(
      (file) =>
        typeof file === "string"
          ? file
          : file.filename,
    ),

    affectedFiles:
      dependencyImpact.affectedFiles,

    criticalAffectedFiles,

    affectedAreas,

    recommendations,

    unresolvedFiles: unresolved,
  };
};

module.exports = {
  normalizePath,
  getBaseName,
  resolveGraphNode,
  resolveChangedFiles,
  isCriticalFile,
  analyzeChangeImpact,
};