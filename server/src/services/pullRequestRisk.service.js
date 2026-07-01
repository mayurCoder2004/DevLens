const {
  UNIVERSAL_PATTERNS,
  TECHNOLOGY_RULES,
  INFRASTRUCTURE_FILES,
  DOCUMENTATION_FILES,
} = require("../config/riskPatterns");

/**
 * Build the active dependency file list based on
 * the detected technologies of the repository.
 */
const getDependencyFiles = (technologies = []) => {
  const dependencyFiles = new Set();

  technologies.forEach((technology) => {
    const rules = TECHNOLOGY_RULES[technology];

    if (!rules) return;

    (rules.dependencyFiles || []).forEach((file) =>
      dependencyFiles.add(file)
    );
  });

  return [...dependencyFiles];
};

/**
 * Classify changed files into different categories.
 */
const classifyChangedFiles = (
  changedFiles = [],
  technologies = []
) => {
  const dependencyFiles = getDependencyFiles(technologies);

  const result = {
    critical: [],
    dependencies: [],
    infrastructure: [],
    documentation: [],
    others: [],
  };

  changedFiles.forEach((file) => {
    const filename = file.filename.toLowerCase();

    // Documentation
    if (
      DOCUMENTATION_FILES.some((pattern) =>
        filename.includes(pattern.toLowerCase())
      )
    ) {
      result.documentation.push(file.filename);
      return;
    }

    // Infrastructure
    if (
      INFRASTRUCTURE_FILES.some((pattern) =>
        filename.includes(pattern.toLowerCase())
      )
    ) {
      result.infrastructure.push(file.filename);
      return;
    }

    // Dependency files
    if (
      dependencyFiles.some((pattern) =>
        filename.includes(pattern.toLowerCase())
      )
    ) {
      result.dependencies.push(file.filename);
      return;
    }

    // Universal critical files
    if (
      UNIVERSAL_PATTERNS.some((pattern) =>
        filename.includes(pattern.toLowerCase())
      )
    ) {
      result.critical.push(file.filename);
      return;
    }

    // Others
    result.others.push(file.filename);
  });

  return {
    summary: {
      totalFiles: changedFiles.length,
      criticalCount: result.critical.length,
      dependencyCount: result.dependencies.length,
      infrastructureCount: result.infrastructure.length,
      documentationCount: result.documentation.length,
      otherCount: result.others.length,
    },

    categories: result,
  };
};

module.exports = {
  classifyChangedFiles,
  getDependencyFiles,
};