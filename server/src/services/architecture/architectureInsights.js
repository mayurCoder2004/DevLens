const SEVERITY = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

class ArchitectureInsights {
  generate({
    metrics,
    analytics,
    hasCircularDependency,
  }) {
    const insights = [];

    // ---------------------------------
    // Circular Dependencies
    // ---------------------------------

    if (hasCircularDependency) {
      insights.push({
        severity: SEVERITY.HIGH,
        type: "warning",
        title: "Circular Dependencies Detected",
        description:
          "Dependency cycles were found in the repository. Circular dependencies increase coupling, complicate testing, and make future refactoring more difficult.",
      });
    } else {
      insights.push({
        severity: SEVERITY.MEDIUM,
        type: "success",
        title: "Healthy Dependency Structure",
        description:
          "No circular dependencies were detected. The dependency graph follows a clean, one-directional structure that improves maintainability.",
      });
    }

    // ---------------------------------
    // Architecture Grade
    // ---------------------------------

    switch (analytics.architectureGrade) {
      case "A":
        insights.push({
          severity: SEVERITY.MEDIUM,
          type: "success",
          title: "Excellent Modularity",
          description:
            "The repository demonstrates strong modular design with low dependency density and a clean architectural structure.",
        });
        break;

      case "B":
        insights.push({
          severity: SEVERITY.LOW,
          type: "info",
          title: "Well Structured Repository",
          description:
            "The architecture is generally well organized, though a few highly connected modules could benefit from further decomposition.",
        });
        break;

      case "C":
        insights.push({
          severity: SEVERITY.HIGH,
          type: "warning",
          title: "Moderate Architectural Complexity",
          description:
            "The repository contains increasing dependency relationships that may impact long-term maintainability.",
        });
        break;

      default:
        insights.push({
          severity: SEVERITY.HIGH,
          type: "warning",
          title: "Architecture Requires Attention",
          description:
            "High dependency density indicates that several modules are tightly coupled. Refactoring into smaller components is recommended.",
        });
    }

    // ---------------------------------
    // Fan-Out Analysis
    // ---------------------------------

    if (analytics.highestFanOut.count >= 15) {
      insights.push({
        severity: SEVERITY.HIGH,
        type: "warning",
        title: "High Coupling Risk",
        description: `${analytics.highestFanOut.name} imports ${analytics.highestFanOut.count} internal modules, making it a central dependency hub. Consider extracting orchestration logic into dedicated services.`,
      });
    } else if (analytics.highestFanOut.count >= 8) {
      insights.push({
        severity: SEVERITY.MEDIUM,
        type: "info",
        title: "Moderate Dependency Hub",
        description: `${analytics.highestFanOut.name} coordinates several modules. Monitor this file as the project grows to avoid excessive coupling.`,
      });
    } else {
      insights.push({
        severity: SEVERITY.LOW,
        type: "success",
        title: "Balanced Dependencies",
        description:
          "No module exhibits unusually high fan-out, indicating responsibilities are reasonably distributed.",
      });
    }

    // ---------------------------------
    // Average Coupling
    // ---------------------------------

    const avg = Number(analytics.averageDependencies);

    if (avg <= 2) {
      insights.push({
        severity: SEVERITY.LOW,
        type: "success",
        title: "Low Coupling",
        description:
          "Modules maintain relatively few dependencies, improving readability, testability, and ease of future modifications.",
      });
    } else if (avg <= 4) {
      insights.push({
        severity: SEVERITY.MEDIUM,
        type: "info",
        title: "Moderate Coupling",
        description:
          "Dependency density is acceptable, but should be monitored as additional features are introduced.",
      });
    } else {
      insights.push({
        severity: SEVERITY.HIGH,
        type: "warning",
        title: "High Coupling",
        description:
          "Modules depend on many other components. Reducing dependency density will simplify maintenance and future development.",
      });
    }

    // ---------------------------------
    // Root Modules
    // ---------------------------------

    if (analytics.rootModules === 1) {
      insights.push({
        severity: SEVERITY.LOW,
        type: "success",
        title: "Single Entry Point",
        description:
          "The repository exposes a clear application entry point, making execution flow easier to understand.",
      });
    } else if (analytics.rootModules <= 3) {
      insights.push({
        severity: SEVERITY.LOW,
        type: "info",
        title: "Multiple Entry Points",
        description:
          "The repository contains a small number of entry modules, which is common for applications supporting multiple execution flows.",
      });
    } else {
      insights.push({
        severity: SEVERITY.MEDIUM,
        type: "warning",
        title: "Many Entry Points",
        description:
          "Numerous root modules may indicate fragmented architecture or multiple independent application flows.",
      });
    }

    // ---------------------------------
    // Leaf Modules
    // ---------------------------------

    const leafRatio =
      analytics.leafModules / metrics.nodeCount;

    if (leafRatio >= 0.6) {
      insights.push({
        severity: SEVERITY.LOW,
        type: "success",
        title: "Well Isolated Components",
        description:
          "A large proportion of terminal modules indicates responsibilities are distributed across independent components.",
      });
    } else if (leafRatio >= 0.4) {
      insights.push({
        severity: SEVERITY.LOW,
        type: "info",
        title: "Moderately Modular Design",
        description:
          "The repository maintains a reasonable number of independent modules while preserving shared functionality.",
      });
    } else {
      insights.push({
        severity: SEVERITY.MEDIUM,
        type: "warning",
        title: "Low Component Isolation",
        description:
          "Many modules are interconnected. Breaking large modules into smaller independent components could improve maintainability.",
      });
    }

    // ---------------------------------
    // Repository Size
    // ---------------------------------

    if (metrics.nodeCount >= 100) {
      insights.push({
        severity: SEVERITY.LOW,
        type: "info",
        title: "Large Codebase",
        description:
          "The repository contains a substantial number of modules. Architectural consistency will become increasingly important as the project evolves.",
      });
    }

    // ---------------------------------
    // Sort by Severity
    // ---------------------------------

    return insights.sort(
      (a, b) => b.severity - a.severity,
    );
  }
}

module.exports = new ArchitectureInsights();