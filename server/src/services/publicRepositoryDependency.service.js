const path = require("path");

const importExtractor = require("./architecture/importExtractor");

const SOURCE_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];

const MAX_GRAPH_SOURCE_FILES = 120;
const MAX_INITIAL_SOURCE_FILES = 20;
const MAX_IMPORT_DEPTH = 5;
const FETCH_CONCURRENCY = 6;

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
    ...SOURCE_EXTENSIONS.map(
      (extension) => `${basePath}${extension}`,
    ),
    ...SOURCE_EXTENSIONS.map(
      (extension) => `${basePath}/index${extension}`,
    ),
  ];

  return (
    candidates.find((candidate) =>
      filePathSet.has(candidate),
    ) || null
  );
};

const getFilePriority = (filePath) => {
  const normalizedPath = normalizePath(filePath);
  const lowerPath = normalizedPath.toLowerCase();
  const basename = path.posix.basename(lowerPath);
  const extension = path.posix.extname(lowerPath);

  if (!SOURCE_EXTENSIONS.includes(extension)) {
    return 0;
  }

  let score = 0;

  if (
    lowerPath === "src/app.js" ||
    lowerPath === "src/app.jsx" ||
    lowerPath === "src/app.ts" ||
    lowerPath === "src/app.tsx"
  ) {
    score += 100;
  }

  if (
    lowerPath === "src/main.js" ||
    lowerPath === "src/main.jsx" ||
    lowerPath === "src/main.ts" ||
    lowerPath === "src/main.tsx"
  ) {
    score += 95;
  }

  if (
    lowerPath === "src/index.js" ||
    lowerPath === "src/index.jsx" ||
    lowerPath === "src/index.ts" ||
    lowerPath === "src/index.tsx"
  ) {
    score += 90;
  }

  if (
    lowerPath === "index.js" ||
    lowerPath === "index.jsx" ||
    lowerPath === "index.ts" ||
    lowerPath === "index.tsx"
  ) {
    score += 80;
  }

  if (
    lowerPath === "main.js" ||
    lowerPath === "main.jsx" ||
    lowerPath === "main.ts" ||
    lowerPath === "main.tsx"
  ) {
    score += 75;
  }

  if (basename.startsWith("app.")) {
    score += 50;
  }

  if (basename.startsWith("main.")) {
    score += 45;
  }

  if (basename.startsWith("index.")) {
    score += 40;
  }

  if (lowerPath.includes("/src/")) {
    score += 20;
  }

  if (lowerPath.includes("/app/")) {
    score += 15;
  }

  if (lowerPath.includes("/pages/")) {
    score += 10;
  }

  return score;
};

const selectInitialSourceFiles = (files = []) => {
  const candidates = files
    .filter(
      (file) =>
        file &&
        file.type === "blob" &&
        typeof file.path === "string" &&
        SOURCE_EXTENSIONS.some((extension) =>
          file.path.toLowerCase().endsWith(extension),
        ),
    )
    .map((file) => ({
      ...file,
      priority: getFilePriority(file.path),
    }))
    .sort((a, b) => {
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }

      return a.path.localeCompare(b.path);
    });

  const prioritized = candidates.filter(
    (file) => file.priority > 0,
  );

  const fallback = candidates.filter(
    (file) => file.priority === 0,
  );

  return [
    ...prioritized,
    ...fallback,
  ].slice(0, MAX_INITIAL_SOURCE_FILES);
};

const analyzePublicRepositoryDependencies = (
  sourceFiles = [],
) => {
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
    const imports = importExtractor.extractImports(
      file.content,
    );

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

const fetchWithConcurrency = async (
  items,
  worker,
  concurrency = FETCH_CONCURRENCY,
) => {
  const results = [];
  let nextIndex = 0;

  const runWorker = async () => {
    while (true) {
      const currentIndex = nextIndex++;

      if (currentIndex >= items.length) {
        return;
      }

      const result = await worker(items[currentIndex]);

      if (result !== null && result !== undefined) {
        results[currentIndex] = result;
      }
    }
  };

  const workers = Array.from(
    {
      length: Math.min(concurrency, items.length),
    },
    () => runWorker(),
  );

  await Promise.all(workers);

  return results.filter(Boolean);
};

const expandDependencyFiles = async ({
  owner,
  repo,
  defaultBranch,
  files,
  getFileContent,
}) => {
  const normalizedTreeFiles = files
    .filter(
      (file) =>
        file &&
        file.type === "blob" &&
        typeof file.path === "string",
    )
    .map((file) => ({
      ...file,
      path: normalizePath(file.path),
    }));

  const filePathSet = new Set(
    normalizedTreeFiles.map((file) => file.path),
  );

  const initialFiles = selectInitialSourceFiles(
    normalizedTreeFiles,
  );

  const fetched = new Map();
  const visited = new Set();
  let frontier = initialFiles;

  for (
    let depth = 0;
    depth <= MAX_IMPORT_DEPTH;
    depth++
  ) {
    const candidates = frontier.filter(
      (file) =>
        file &&
        typeof file.path === "string" &&
        !visited.has(file.path) &&
        !fetched.has(file.path) &&
        fetched.size < MAX_GRAPH_SOURCE_FILES,
    );

    if (candidates.length === 0) {
      break;
    }

    candidates.forEach((file) =>
      visited.add(file.path),
    );

    const remainingCapacity =
      MAX_GRAPH_SOURCE_FILES - fetched.size;

    const batch = candidates.slice(
      0,
      remainingCapacity,
    );

    const contents = await fetchWithConcurrency(
      batch,
      async (file) => {
        const content = await getFileContent(
          owner,
          repo,
          defaultBranch,
          file.path,
        );

        if (typeof content !== "string") {
          return null;
        }

        return {
          name: path.posix.basename(file.path),
          path: file.path,
          content,
        };
      },
    );

    const nextFrontier = [];

    for (const sourceFile of contents) {
      fetched.set(sourceFile.path, sourceFile);

      const imports = importExtractor.extractImports(
        sourceFile.content,
      );

      for (const importPath of imports) {
        const resolvedPath = resolveImportPath(
          sourceFile.path,
          importPath,
          filePathSet,
        );

        if (!resolvedPath) {
          continue;
        }

        if (
          !fetched.has(resolvedPath) &&
          !visited.has(resolvedPath)
        ) {
          const resolvedFile = normalizedTreeFiles.find(
            (file) => file.path === resolvedPath,
          );

          if (resolvedFile) {
            nextFrontier.push(resolvedFile);
          }
        }
      }
    }

    frontier = nextFrontier;
  }

  return Array.from(fetched.values());
};

module.exports = {
  analyzePublicRepositoryDependencies,
  normalizePath,
  resolveImportPath,
  selectInitialSourceFiles,
  expandDependencyFiles,
};
