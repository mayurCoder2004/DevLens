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

const formatChange = (change) => {
  if (change > 0) {
    return `+${change}`;
  }

  return `${change}`;
};

const generateChangeMessage = ({
  label,
  change,
  direction,
}) => {
  if (direction === "unchanged") {
    return `${label} remained unchanged.`;
  }

  const absoluteChange = Math.abs(change);

  if (direction === "improved") {
    return `${label} improved by ${absoluteChange} point${
      absoluteChange === 1 ? "" : "s"
    }.`;
  }

  return `${label} declined by ${absoluteChange} point${
    absoluteChange === 1 ? "" : "s"
  }.`;
};

const generateChangeEvents = (changes = []) => {
  return changes
    .filter((change) => change.direction !== "unchanged")
    .map((change) => ({
      metric: change.metric,
      label: change.label,
      direction: change.direction,
      previous: change.previous,
      current: change.current,
      change: change.change,
      changeText: formatChange(change.change),
      message: generateChangeMessage(change),
    }));
};

const generateOverallSummary = (summary) => {
  const {
    improved = 0,
    declined = 0,
    unchanged = 0,
  } = summary;

  if (improved > 0 && declined === 0) {
    return `${improved} engineering metric${
      improved === 1 ? "" : "s"
    } improved with no declines.`;
  }

  if (declined > 0 && improved === 0) {
    return `${declined} engineering metric${
      declined === 1 ? "" : "s"
    } declined with no improvements.`;
  }

  if (improved > 0 && declined > 0) {
    return `${improved} metric${
      improved === 1 ? "" : "s"
    } improved while ${declined} declined.`;
  }

  if (unchanged > 0) {
    return "No engineering metrics changed.";
  }

  return "No snapshot comparison data available.";
};

const compareSnapshots = (
  previousSnapshot,
  currentSnapshot,
) => {
  if (!currentSnapshot) {
    throw new Error("Current snapshot is required");
  }

  if (!previousSnapshot) {
    return {
      hasPreviousSnapshot: false,
      hasChanges: false,
      changes: [],
      changeEvents: [],
      summary: {
        improved: 0,
        declined: 0,
        unchanged: 0,
      },
      overallSummary:
        "This is the first repository snapshot. No previous state is available for comparison.",
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

  const summary = {
    improved,
    declined,
    unchanged,
  };

  const changeEvents =
    generateChangeEvents(changes);

  return {
    hasPreviousSnapshot: true,

    hasChanges: changes.some(
      (item) => item.direction !== "unchanged",
    ),

    changes,

    changeEvents,

    summary,

    overallSummary:
      generateOverallSummary(summary),
  };
};

module.exports = {
  METRICS,
  getMetricChange,
  getDirection,
  formatChange,
  generateChangeMessage,
  generateChangeEvents,
  generateOverallSummary,
  compareSnapshots,
};
