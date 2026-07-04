const {
  UNIVERSAL_PATTERNS,
  TECHNOLOGY_RULES,
  INFRASTRUCTURE_FILES,
  DOCUMENTATION_FILES,
  RISK_WEIGHTS
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

const calculateRiskScore = (classification) => {
  const { summary } = classification;

  const breakdown = {
    critical: Math.min(
      summary.criticalCount * RISK_WEIGHTS.critical.perFile,
      RISK_WEIGHTS.critical.max
    ),

    infrastructure: Math.min(
      summary.infrastructureCount * RISK_WEIGHTS.infrastructure.perFile,
      RISK_WEIGHTS.infrastructure.max
    ),

    dependency: Math.min(
      summary.dependencyCount * RISK_WEIGHTS.dependency.perFile,
      RISK_WEIGHTS.dependency.max
    ),

    fileCount: 0,

    documentation: -Math.min(
      summary.documentationCount *
        RISK_WEIGHTS.documentation.reductionPerFile,
      RISK_WEIGHTS.documentation.maxReduction
    ),
  };

  // File count contribution
  for (const threshold of RISK_WEIGHTS.fileCount.thresholds) {
    if (summary.totalFiles >= threshold.min) {
      breakdown.fileCount = threshold.score;
      break;
    }
  }

  let score =
    breakdown.critical +
    breakdown.infrastructure +
    breakdown.dependency +
    breakdown.fileCount +
    breakdown.documentation;

  score = Math.max(0, Math.min(score, 100));

  let level = "Low";

  if (score >= 75) {
    level = "Critical";
  } else if (score >= 50) {
    level = "High";
  } else if (score >= 25) {
    level = "Medium";
  }

  return {
    score,
    level,
    breakdown,
  };
};

module.exports = {
  classifyChangedFiles,
  getDependencyFiles,
  calculateRiskScore,
};