const IMPACT_WEIGHTS = {
  scope: {
    thresholds: [
      { max: 2, score: 5 },
      { max: 5, score: 10 },
      { max: 10, score: 18 },
      { max: Infinity, score: 25 },
    ],
  },

  dependencyReach: {
    thresholds: [
      { max: 3, score: 5 },
      { max: 7, score: 12 },
      { max: 15, score: 22 },
      { max: Infinity, score: 30 },
    ],
  },

  criticality: {
    thresholds: [
      { max: 0, score: 0 },
      { max: 1, score: 8 },
      { max: 2, score: 16 },
      { max: Infinity, score: 25 },
    ],
  },

  dependencyDepth: {
    thresholds: [
      { max: 0, score: 0 },
      { max: 1, score: 5 },
      { max: 2, score: 10 },
      { max: 3, score: 15 },
      { max: Infinity, score: 20 },
    ],
  },
};

const IMPACT_LEVELS = [
  {
    min: 75,
    label: "Critical",
  },
  {
    min: 50,
    label: "High",
  },
  {
    min: 25,
    label: "Moderate",
  },
  {
    min: 0,
    label: "Low",
  },
];

module.exports = {
  IMPACT_WEIGHTS,
  IMPACT_LEVELS,
};