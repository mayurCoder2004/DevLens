const DEFAULT_MAX_DEPTH = 5;

/**
 * Build a reverse dependency index.
 *
 * Existing architecture edges have the form:
 *
 * source -> target
 *
 * where source imports/depends on target.
 *
 * For change impact we need:
 *
 * target -> source
 *
 * so we can answer:
 * "Who depends on this changed file?"
 */
const buildReverseDependencyMap = (graph = {}) => {
  const reverseDependencies = new Map();

  const edges = Array.isArray(graph.edges) ? graph.edges : [];

  for (const edge of edges) {
    if (!edge?.source || !edge?.target) {
      continue;
    }

    if (!reverseDependencies.has(edge.target)) {
      reverseDependencies.set(edge.target, new Set());
    }

    reverseDependencies.get(edge.target).add(edge.source);
  }

  return reverseDependencies;
};

/**
 * Find all files potentially affected by a change.
 *
 * Traverses the dependency graph backwards using BFS.
 */
const findAffectedFiles = (
  graph = {},
  changedFiles = [],
  maxDepth = DEFAULT_MAX_DEPTH,
) => {
  const reverseDependencies = buildReverseDependencyMap(graph);

  const visited = new Set();
  const queue = [];

  for (const file of changedFiles) {
    if (!file) {
      continue;
    }

    visited.add(file);

    queue.push({
      file,
      depth: 0,
    });
  }

  const affectedFiles = [];
  let maxReachedDepth = 0;

  while (queue.length > 0) {
    const current = queue.shift();

    const dependents = reverseDependencies.get(current.file);

    if (!dependents) {
      continue;
    }

    if (current.depth >= maxDepth) {
      continue;
    }

    for (const dependent of dependents) {
      if (visited.has(dependent)) {
        continue;
      }

      const depth = current.depth + 1;

      visited.add(dependent);

      affectedFiles.push({
        file: dependent,
        depth,
      });

      maxReachedDepth = Math.max(maxReachedDepth, depth);

      queue.push({
        file: dependent,
        depth,
      });
    }
  }

  return {
    affectedFiles,
    affectedFileCount: affectedFiles.length,
    maxDepth: maxReachedDepth,
  };
};

module.exports = {
  buildReverseDependencyMap,
  findAffectedFiles,
};