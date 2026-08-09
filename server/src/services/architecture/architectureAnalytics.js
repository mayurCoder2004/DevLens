class ArchitectureAnalytics {
  calculate(graph) {
    const nodes = graph.nodes || [];
    const edges = graph.edges || [];

    // -------------------------
    // Build incoming/outgoing maps
    // -------------------------

    const incoming = new Map();
    const outgoing = new Map();

    nodes.forEach((node) => {
      incoming.set(node.id, 0);
      outgoing.set(node.id, 0);
    });

    edges.forEach((edge) => {
      outgoing.set(edge.source, (outgoing.get(edge.source) || 0) + 1);

      incoming.set(edge.target, (incoming.get(edge.target) || 0) + 1);
    });

    // -------------------------
    // Most Imported File
    // -------------------------

    let mostImportedFile = {
      name: "-",
      count: 0,
    };

    incoming.forEach((count, file) => {
      if (count > mostImportedFile.count) {
        mostImportedFile = {
          name: file,
          count,
        };
      }
    });

    // -------------------------
    // Highest Fan-Out
    // -------------------------

    let highestFanOut = {
      name: "-",
      count: 0,
    };

    outgoing.forEach((count, file) => {
      if (count > highestFanOut.count) {
        highestFanOut = {
          name: file,
          count,
        };
      }
    });

    // -------------------------
    // Root Modules
    // (No incoming edges)
    // -------------------------

    const rootModules = [...incoming.values()].filter(
      (count) => count === 0,
    ).length;

    // -------------------------
    // Leaf Modules
    // (No outgoing edges)
    // -------------------------

    const leafModules = [...outgoing.values()].filter(
      (count) => count === 0,
    ).length;

    // -------------------------
    // Average Dependencies
    // -------------------------

    const averageDependencies =
      nodes.length === 0 ? 0 : (edges.length / nodes.length).toFixed(1);

    // -------------------------
    // Architecture Grade
    // -------------------------

    const dependencyRatio =
      nodes.length === 0 ? 0 : edges.length / nodes.length;

    let architectureGrade = "A";

    if (dependencyRatio > 5) {
      architectureGrade = "D";
    } else if (dependencyRatio > 4) {
      architectureGrade = "C";
    } else if (dependencyRatio > 3) {
      architectureGrade = "B";
    }

    return {
      mostImportedFile,

      highestFanOut,

      rootModules,

      leafModules,

      averageDependencies,

      architectureGrade,
    };
  }
}

module.exports = new ArchitectureAnalytics();
