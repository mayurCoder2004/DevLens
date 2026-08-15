class DependencyResolver {
  /**
   * Resolve an internal import to the repository-relative
   * path of the target file.
   *
   * Example:
   *
   * import "../components/Button"
   *
   * -> frontend/src/components/Button.jsx
   */
  resolveImport(importPath, currentFile, files) {
    if (!importPath || !currentFile || !Array.isArray(files)) {
      return null;
    }

    const currentPath = currentFile.path;

    if (!currentPath) {
      return null;
    }

    const path = require("path");

    // Convert GitHub repository paths to a POSIX-style
    // filesystem path regardless of the host OS.
    const currentDirectory = path.posix.dirname(
      currentPath,
    );

    const resolvedBasePath = path.posix.normalize(
      path.posix.join(
        currentDirectory,
        importPath,
      ),
    );

    // Remove leading "./" if present.
    const normalizedImportPath =
      resolvedBasePath.replace(/^\.\/+/, "");

    // Exact path match first.
    const exactMatch = files.find(
      (file) =>
        file.path === normalizedImportPath,
    );

    if (exactMatch) {
      return exactMatch.path;
    }

    // Imports often omit extensions.
    const extensions = [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
    ];

    for (const extension of extensions) {
      const match = files.find(
        (file) =>
          file.path ===
          `${normalizedImportPath}${extension}`,
      );

      if (match) {
        return match.path;
      }
    }

    // Support directory/index imports.
    for (const extension of extensions) {
      const indexPath =
        `${normalizedImportPath}/index${extension}`;

      const match = files.find(
        (file) => file.path === indexPath,
      );

      if (match) {
        return match.path;
      }
    }

    return null;
  }

  isInternalImport(importPath) {
    return (
      typeof importPath === "string" &&
      (importPath.startsWith("./") ||
        importPath.startsWith("../"))
    );
  }
}

module.exports = new DependencyResolver();