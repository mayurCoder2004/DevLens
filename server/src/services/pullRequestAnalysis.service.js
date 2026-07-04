const githubService = require("./github.service");

const {
  classifyChangedFiles,
  calculateRiskScore,
  generateRecommendations,
} = require("./pullRequestRisk.service");

/**
 * Build a summary of pull request changes.
 */
const buildPullRequestSummary = (files = []) => ({
  totalFiles: files.length,

  additions: files.reduce(
    (sum, file) => sum + (file.additions || 0),
    0
  ),

  deletions: files.reduce(
    (sum, file) => sum + (file.deletions || 0),
    0
  ),

  totalChanges: files.reduce(
    (sum, file) => sum + (file.changes || 0),
    0
  ),
});

/**
 * Analyze a pull request.
 */
const analyzePullRequest = async ({
  owner,
  repo,
  prNumber,
  githubToken,
  technologies = [],
}) => {
  try {
    // Fetch changed files from GitHub
    const files = await githubService.getPullRequestFiles(
      owner,
      repo,
      prNumber,
      githubToken
    );

    // Build summary
    const summary = buildPullRequestSummary(files);

    // Classify files
    const classification = classifyChangedFiles(
      files,
      technologies
    );

    // Calculate risk
    const risk = calculateRiskScore(classification);

    // Generate recommendations
    const recommendations = generateRecommendations(
      classification,
      risk
    );

    return {
      pullRequest: {
        owner,
        repo,
        prNumber,
      },

      summary,

      classification,

      risk,

      recommendations,

      files,
    };
  } catch (error) {
    console.error("Pull Request Analysis Error:", error);

    throw new Error("Failed to analyze pull request.");
  }
};

module.exports = {
  analyzePullRequest,
  buildPullRequestSummary,
};