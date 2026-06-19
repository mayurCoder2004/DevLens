class ArchitectureMetrics {
  calculate(graph) {
    const nodeCount = graph.nodes.length;
    const edgeCount = graph.edges.length;

    const complexityScore =
      nodeCount + edgeCount * 2;

    return {
      nodeCount,
      edgeCount,
      complexityScore,
    };
  }
}

module.exports = new ArchitectureMetrics();