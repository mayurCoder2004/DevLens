const {
  IMPACT_WEIGHTS,
  IMPACT_LEVELS,
} = require("../../config/changeImpactPatterns");

const getThresholdScore = (value, thresholds) => {
  for (const threshold of thresholds) {
    if (value <= threshold.max) {
      return threshold.score;
    }
  }

  return 0;
};

const getImpactLevel = (score) => {
  for (const level of IMPACT_LEVELS) {
    if (score >= level.min) {
      return level.label;
    }
  }

  return "Low";
};

const calculateImpactScore = ({
  changedFileCount = 0,
  affectedFileCount = 0,
  criticalAffectedFileCount = 0,
  maxDependencyDepth = 0,
} = {}) => {
  const scope = getThresholdScore(
    changedFileCount,
    IMPACT_WEIGHTS.scope.thresholds,
  );

  const dependencyReach = getThresholdScore(
    affectedFileCount,
    IMPACT_WEIGHTS.dependencyReach.thresholds,
  );

  const criticality = getThresholdScore(
    criticalAffectedFileCount,
    IMPACT_WEIGHTS.criticality.thresholds,
  );

  const dependencyDepth = getThresholdScore(
    maxDependencyDepth,
    IMPACT_WEIGHTS.dependencyDepth.thresholds,
  );

  const score = Math.min(
    scope + dependencyReach + criticality + dependencyDepth,
    100,
  );

  return {
    score,
    level: getImpactLevel(score),

    breakdown: {
      scope,
      dependencyReach,
      criticality,
      dependencyDepth,
    },

    metrics: {
      changedFileCount,
      affectedFileCount,
      criticalAffectedFileCount,
      maxDependencyDepth,
    },
  };
};

module.exports = {
  calculateImpactScore,
};