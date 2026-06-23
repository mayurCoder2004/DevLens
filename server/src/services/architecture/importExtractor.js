class ImportExtractor {
  extractImports(content) {
    const imports = [];

    const importRegex = /import\s+.*?\s+from\s+["'](.*?)["']/g;

    const requireRegex = /require\(["'](.*?)["']\)/g;

    let match;

    while ((match = importRegex.exec(content))) {
      imports.push(match[1]);
    }

    while ((match = requireRegex.exec(content))) {
      imports.push(match[1]);
    }

    return imports;
  }
}

module.exports = new ImportExtractor();
