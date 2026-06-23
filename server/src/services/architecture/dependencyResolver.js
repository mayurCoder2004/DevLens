class DependencyResolver {
  resolveImport(importPath, files) {
    const fileName = importPath.split("/").pop();

    const matchedFile = files.find((file) => file.name.startsWith(fileName));

    return matchedFile ? matchedFile.name : null;
  }

  isInternalImport(importPath) {
    return importPath.startsWith("./") || importPath.startsWith("../");
  }
}

module.exports = new DependencyResolver();
