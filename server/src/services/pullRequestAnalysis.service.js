const githubService = require("./github.service");

const {
  classifyChangedFiles,
  calculateRiskScore,
  generateRecommendations,
} = require("./pullRequestRisk.service");

const {
  analyzeDiffIntelligence,
} = require("./diffIntelligence.service");

/**
 * Build a summary of pull request changes.
 */
const buildPullRequestSummary = (files = []) => ({
  totalFiles: files.length,

  additions: files.reduce(
    (sum, file) => sum + (file.additions || 0),
    0,
  ),

  deletions: files.reduce(
    (sum, file) => sum + (file.deletions || 0),
    0,
  ),

  totalChanges: files.reduce(
    (sum, file) => sum + (file.changes || 0),
    0,
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
    // --------------------------------------------
    // Fetch Pull Request Data
    // --------------------------------------------

    const [pullRequest, files] = await Promise.all([
      githubService.getPullRequest(
        owner,
        repo,
        prNumber,
        githubToken,
      ),

      githubService.getPullRequestFiles(
        owner,
        repo,
        prNumber,
        githubToken,
      ),
    ]);

    // --------------------------------------------
    // Build Summary
    // --------------------------------------------

    const summary = buildPullRequestSummary(files);

    // --------------------------------------------
    // Diff Intelligence
    // --------------------------------------------

    const diffIntelligence =
      analyzeDiffIntelligence(files);

    // --------------------------------------------
    // Classify Changed Files
    // --------------------------------------------

    const classification = classifyChangedFiles(
      files,
      technologies,
    );

    // --------------------------------------------
    // Calculate Risk
    // --------------------------------------------

    const risk = calculateRiskScore(
      classification,
    );

    // --------------------------------------------
    // Generate Recommendations
    // --------------------------------------------

    const recommendations =
      generateRecommendations(
        classification,
        risk,
      );

    // --------------------------------------------
    // Return Complete Analysis
    // --------------------------------------------

    return {
      pullRequest: {
        number: pullRequest.number,

        title: pullRequest.title,

        state: pullRequest.state,

        author: pullRequest.user?.login,

        authorAvatar:
          pullRequest.user?.avatar_url,

        baseBranch:
          pullRequest.base?.ref,

        headBranch:
          pullRequest.head?.ref,

        createdAt:
          pullRequest.created_at,

        updatedAt:
          pullRequest.updated_at,

        merged:
          pullRequest.merged,

        url:
          pullRequest.html_url,
      },

      summary,

      classification,

      risk,

      // New Diff Intelligence analysis
      diffIntelligence,

      recommendations,

      files,
    };
  } catch (error) {
    console.error(
      "Pull Request Analysis Error:",
      error.message,
    );

    throw new Error(
      "Failed to analyze pull request.",
    );
  }
};

module.exports = {
  analyzePullRequest,
  buildPullRequestSummary,
};