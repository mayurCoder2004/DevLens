const path = require("path");

const importExtractor = require("./architecture/importExtractor");

const SOURCE_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];

const normalizePath = (filePath) => {
  return filePath
    .replace(/\\/g, "/")
    .replace(/^\.\/+/, "");
};

const resolveImportPath = (sourcePath, importPath, filePathSet) => {
  if (
    typeof importPath !== "string" ||
    (!importPath.startsWith("./") && !importPath.startsWith("../"))
  ) {
    return null;
  }

  const sourceDirectory = path.posix.dirname(sourcePath);

  const basePath = normalizePath(
    path.posix.normalize(
      path.posix.join(sourceDirectory, importPath),
    ),
  );

  const candidates = [
    basePath,
    ...SOURCE_EXTENSIONS.map((extension) => `${basePath}${extension}`),
    ...SOURCE_EXTENSIONS.map(
      (extension) => `${basePath}/index${extension}`,
    ),
  ];

  return candidates.find((candidate) => filePathSet.has(candidate)) || null;
};

const analyzePublicRepositoryDependencies = (sourceFiles = []) => {
  const normalizedFiles = sourceFiles
    .filter(
      (file) =>
        file &&
        typeof file.path === "string" &&
        typeof file.content === "string",
    )
    .map((file) => ({
      ...file,
      path: normalizePath(file.path),
    }));

  const filePathSet = new Set(
    normalizedFiles.map((file) => file.path),
  );

  const nodes = normalizedFiles.map((file) => ({
    id: file.path,
    label: path.posix.basename(file.path),
    path: file.path,
  }));

  const edges = [];
  const dependencies = [];

  for (const file of normalizedFiles) {
    const imports = importExtractor.extractImports(file.content);

    const resolvedImports = [];

    for (const importPath of imports) {
      const resolvedPath = resolveImportPath(
        file.path,
        importPath,
        filePathSet,
      );

      if (!resolvedPath) {
        continue;
      }

      resolvedImports.push({
        importPath,
        resolvedPath,
      });

      edges.push({
        id: `${file.path}->${resolvedPath}`,
        source: file.path,
        target: resolvedPath,
      });
    }

    dependencies.push({
      path: file.path,
      imports,
      resolvedImports,
    });
  }

  return {
    nodes,
    edges,
    dependencies,
  };
};

module.exports = {
  analyzePublicRepositoryDependencies,
  normalizePath,
  resolveImportPath,
};
