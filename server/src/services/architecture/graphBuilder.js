class GraphBuilder {
  buildGraph(filesWithImports) {
    const nodeSet = new Set();
    const edges = [];

    for (const file of filesWithImports) {
      nodeSet.add(file.name);

      for (const importedFile of file.imports) {
        edges.push({
          source: file.name,
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
