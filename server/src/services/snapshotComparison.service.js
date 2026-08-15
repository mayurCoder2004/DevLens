const METRICS = [
  {
    key: "engineeringScore",
    label: "Engineering Health",
    higherIsBetter: true,
  },
  {
    key: "technicalDebtScore",
    label: "Technical Debt",
    higherIsBetter: false,
  },
  {
    key: "architectureScore",
    label: "Architecture Health",
    higherIsBetter: true,
  },
  {
    key: "deploymentScore",
    label: "Deployment Readiness",
    higherIsBetter: true,
  },
  {
    key: "prRiskScore",
    label: "Pull Request Risk",
    higherIsBetter: false,
  },
  {
    key: "maintainabilityScore",
    label: "Maintainability",
    higherIsBetter: true,
  },
];

const getMetricChange = (previousValue, currentValue) => {
  const previous = Number(previousValue ?? 0);
  const current = Number(currentValue ?? 0);

  return {
    previous,
    current,
    change: current - previous,
  };
};

const getDirection = (change, higherIsBetter) => {
  if (change === 0) {
    return "unchanged";
  }

  const improved =
    higherIsBetter ? change > 0 : change < 0;

  return improved ? "improved" : "declined";
};

const compareSnapshots = (previousSnapshot, currentSnapshot) => {
  if (!currentSnapshot) {
    throw new Error("Current snapshot is required");
  }

  if (!previousSnapshot) {
    return {
      hasPreviousSnapshot: false,
      hasChanges: false,
      changes: [],
      summary: {
        improved: 0,
        declined: 0,
        unchanged: 0,
      },
    };
  }

  const changes = METRICS.map((metric) => {
    const result = getMetricChange(
      previousSnapshot[metric.key],
      currentSnapshot[metric.key],
    );

    return {
      metric: metric.key,
      label: metric.label,
      previous: result.previous,
      current: result.current,
      change: result.change,
      direction: getDirection(
        result.change,
        metric.higherIsBetter,
      ),
    };
  });

  const improved = changes.filter(
    (item) => item.direction === "improved",
  ).length;

  const declined = changes.filter(
    (item) => item.direction === "declined",
  ).length;

  const unchanged = changes.filter(
    (item) => item.direction === "unchanged",
  ).length;

  return {
    hasPreviousSnapshot: true,
    hasChanges: changes.some(
      (item) => item.direction !== "unchanged",
    ),
    changes,
    summary: {
      improved,
      declined,
      unchanged,
    },
  };
};

module.exports = {
  METRICS,
  getMetricChange,
  getDirection,
  compareSnapshots,
};
