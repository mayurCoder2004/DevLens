class ArchitecturePromptBuilder {
  /**
   * Build the prompt for architecture recommendations.
   *
   * @param {Object} context
   * @param {Object} context.architecture
   * @param {Object} context.analytics
   * @param {Array} context.insights
   *
   * @returns {string}
   */
  build({ architecture, analytics, insights }) {
    const {
      nodeCount,
      edgeCount,
      complexityScore,
      hasCircularDependency,
    } = architecture;

    return `
You are a Senior Software Architect performing an architecture review for a production software repository.

Your goal is to identify the highest-impact architectural improvements while avoiding unnecessary or speculative recommendations.

Analyze the repository architecture below and provide actionable engineering recommendations.

Repository Metrics:
- Nodes: ${nodeCount}
- Edges: ${edgeCount}
- Complexity Score: ${complexityScore}
- Circular Dependencies: ${hasCircularDependency ? "Yes" : "No"}

Architecture Analytics:
- Architecture Grade: ${analytics.architectureGrade}
- Root Modules: ${analytics.rootModules}
- Leaf Modules: ${analytics.leafModules}
- Average Dependencies per Module: ${analytics.averageDependencies}
- Highest Fan-Out Module: ${analytics.highestFanOut.name} (${analytics.highestFanOut.count} dependencies)
- Most Imported Module: ${analytics.mostImportedFile.name} (${analytics.mostImportedFile.count} imports)

Existing Engineering Insights:
${insights
  .map(
    (insight) =>
      `- ${insight.title}: ${insight.description}`,
  )
  .join("\n")}

Instructions:

1. Analyze the repository as a senior software architect.

2. Focus on:
- Maintainability
- Modularity
- Scalability
- Coupling
- Cohesion
- Dependency Management
- Code Organization

3. Do NOT repeat the existing engineering insights.

4. Identify only improvements that would provide meaningful engineering value.

5. Recommendations should be:
- Specific
- Actionable
- Prioritized
- Practical for real-world development teams

6. Provide between 3 and 5 recommendations.

7. Base every recommendation only on the provided repository architecture.
Do not invent technologies, frameworks, files, or modules that are not present in the analysis.

Return ONLY a valid JSON array.

Every recommendation MUST follow this schema exactly:

[
  {
    "title": "...",
    "priority": "HIGH | MEDIUM | LOW",
    "category": "...",
    "description": "...",
    "impact": "...",
    "implementation": "..."
  }
]

Rules:
- No markdown.
- No code fences.
- No explanations.
- No additional text.
- Output must be valid JSON.
`;
  }
}

module.exports = new ArchitecturePromptBuilder();