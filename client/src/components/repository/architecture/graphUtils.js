/**
 * Graph utilities for converting backend data to React Flow format
 * Handles node/edge creation and dependency analysis
 */

/**
 * Calculate dependency statistics for a node
 * @param {string} nodeId - Node identifier
 * @param {Array} edges - Graph edges
 * @returns {Object} Dependency counts
 */
export function calculateDependencyStats(nodeId, edges) {
  // Outgoing edges = files this node imports
  const imports = edges.filter((edge) => edge.source === nodeId).length;

  // Incoming edges = files that import this node
  const importedBy = edges.filter((edge) => edge.target === nodeId).length;

  return {
    imports, // Files this node depends on
    importedBy, // Files that depend on this node
    total: imports + importedBy,
  };
}

/**
 * Convert backend architecture data to React Flow nodes
 * @param {Object} architecture - Backend architecture object
 * @returns {Array} React Flow nodes with metadata
 */
export function createNodesFromArchitecture(architecture) {
  if (!architecture?.graph?.nodes) {
    return [];
  }

  return architecture.graph.nodes.map((node) => {
    const stats = calculateDependencyStats(node.id, architecture.graph.edges);

    return {
      id: node.id,
      type: "architectureNode",
      data: {
        label: node.id,
        imports: stats.imports,
        importedBy: stats.importedBy,
        totalConnections: stats.total,
      },
      position: { x: 0, y: 0 }, // Will be set by layout algorithm
    };
  });
}

/**
 * Convert backend edges to React Flow edges
 * @param {Object} architecture - Backend architecture object
 * @returns {Array} React Flow edges with styling
 */
export function createEdgesFromArchitecture(architecture) {
  if (!architecture?.graph?.edges) {
    return [];
  }

  return architecture.graph.edges.map((edge, index) => ({
    id: `edge-${edge.source}-${edge.target}-${index}`,
    source: edge.source,
    target: edge.target,
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "rgb(59, 130, 246)",
      strokeWidth: 2,
    },
  }));
}

/**
 * Find most connected nodes (potential bottlenecks or hubs)
 * @param {Array} nodes - React Flow nodes
 * @returns {Array} Sorted nodes by connection count
 */
export function findMostConnectedNodes(nodes, limit = 10) {
  return [...nodes]
    .sort(
      (a, b) => (b.data.totalConnections || 0) - (a.data.totalConnections || 0),
    )
    .slice(0, limit);
}

/**
 * Analyze graph complexity
 * @param {Object} architecture - Backend architecture object
 * @returns {Object} Complexity metrics
 */
export function analyzeGraphComplexity(architecture) {
  if (!architecture?.graph) {
    return {
      nodeCount: 0,
      edgeCount: 0,
      avgConnections: 0,
      complexity: "low",
    };
  }

  const nodeCount = architecture.graph.nodes.length;
  const edgeCount = architecture.graph.edges.length;
  const avgConnections =
    nodeCount > 0 ? ((edgeCount * 2) / nodeCount).toFixed(1) : 0;

  // Determine complexity level
  let complexity = "low";
  if (nodeCount > 100 || avgConnections > 10) {
    complexity = "high";
  } else if (nodeCount > 50 || avgConnections > 5) {
    complexity = "medium";
  }

  return {
    nodeCount,
    edgeCount,
    avgConnections,
    complexity,
    hasCircularDeps: architecture.hasCircularDependency || false,
  };
}
