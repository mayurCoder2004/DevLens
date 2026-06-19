class GraphBuilder {
  buildGraph(filesWithImports) {
    const nodes = [];
    const edges = [];

    for (const file of filesWithImports) {
      nodes.push({
        id: file.name,
      });

      for (const importedFile of file.imports) {
        edges.push({
          source: file.name,
          target: importedFile,
        });
      }
    }

    return {
      nodes,
      edges,
    };
  }
}

module.exports = new GraphBuilder();