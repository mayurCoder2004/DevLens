class CircularDependencyDetector {
  detect(graph) {
    const adjacencyList = {};

    for (const edge of graph.edges) {
      if (!adjacencyList[edge.source]) {
        adjacencyList[edge.source] = [];
      }

      adjacencyList[edge.source].push(
        edge.target
      );
    }

    const visited = new Set();
    const recursionStack = new Set();

    const hasCycle = (node) => {
      if (recursionStack.has(node)) {
        return true;
      }

      if (visited.has(node)) {
        return false;
      }

      visited.add(node);
      recursionStack.add(node);

      const neighbors =
        adjacencyList[node] || [];

      for (const neighbor of neighbors) {
        if (hasCycle(neighbor)) {
          return true;
        }
      }

      recursionStack.delete(node);

      return false;
    };

    for (const node of graph.nodes) {
      if (hasCycle(node.id)) {
        return true;
      }
    }

    return false;
  }
}

module.exports =
  new CircularDependencyDetector();