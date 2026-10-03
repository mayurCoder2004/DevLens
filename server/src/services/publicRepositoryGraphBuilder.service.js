const path = require("path");

const buildPublicRepositoryGraph = (dependencyAnalysis) => {
  const {
    nodes = [],
    edges = [],
  } = dependencyAnalysis || {};

  const graphNodes = nodes.map((node) => ({
    id: node.id,
    type: "file",
    data: {
      label: node.label || path.posix.basename(node.path || node.id),
      path: node.path || node.id,
    },
  }));

  const graphEdges = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
  }));

  return {
    nodes: graphNodes,
    edges: graphEdges,
  };
};

module.exports = {
  buildPublicRepositoryGraph,
};
