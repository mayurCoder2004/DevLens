class GraphBuilder {
  buildGraph(filesWithImports = []) {
    const nodeSet = new Set();
    const edges = [];

    for (const file of filesWithImports) {
      if (!file?.path) {
        continue;
      }

      // Use the complete repository-relative path
      // as the architecture node ID.
      nodeSet.add(file.path);

      for (const importedFile of file.imports || []) {
        if (!importedFile) {
          continue;
        }

        edges.push({
          source: file.path,
          target: importedFile,
        });
      }
    }

    return {
      nodes: [...nodeSet].map((node) => ({
        id: node,
      })),

      edges,
    };
  }
}

module.exports = new GraphBuilder();