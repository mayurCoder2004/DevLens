import PullRequestChangedFiles from "../pullRequest/PullRequestChangedFiles";
import PullRequestCodeReviewSummary from "../pullRequest/PullRequestCodeReviewSummary";
import PullRequestHero from "../pullRequest/PullRequestHero";
import PullRequestOverview from "../pullRequest/PullRequestOverview";
import PullRequestRecommendations from "../pullRequest/PullRequestRecommendations";
import PullRequestRiskBreakdown from "../pullRequest/PullRequestRiskBreakdown";
import PullRequestSummaryCards from "../pullRequest/PullRequestSummaryCards";
import PullRequestChangeImpact from "../pullRequest/PullRequestChangeImpact";
import PullRequestDiffIntelligence from "../pullRequest/PullRequestDiffIntelligence";

export default function RepositoryPullRequest({
  pullRequestAnalysis,
  changeImpact,
}) {
  if (!pullRequestAnalysis) return null;

  return (
    <div className="space-y-8">
      {/* Pull Request Header */}
      <PullRequestHero
        pullRequestAnalysis={pullRequestAnalysis}
      />

      {/* Summary Metrics */}
      <PullRequestSummaryCards
        pullRequestAnalysis={pullRequestAnalysis}
      />

      {/* Pull Request Overview */}
      <PullRequestOverview
        pullRequestAnalysis={pullRequestAnalysis}
      />

      {/* Risk + Recommendations */}
      <div className="grid gap-8 xl:grid-cols-2">
        <PullRequestRiskBreakdown
          pullRequestAnalysis={pullRequestAnalysis}
        />

        <PullRequestRecommendations
          pullRequestAnalysis={pullRequestAnalysis}
        />
      </div>

      {/* Change Impact */}
      <PullRequestChangeImpact
        changeImpact={changeImpact}
      />

      {/* Diff Intelligence */}
      <PullRequestDiffIntelligence
        pullRequestAnalysis={pullRequestAnalysis}
      />

      {/* Changed Files */}
      <PullRequestChangedFiles
        pullRequestAnalysis={pullRequestAnalysis}
      />

      {/* Code Review Summary */}
      <PullRequestCodeReviewSummary
        pullRequestAnalysis={pullRequestAnalysis}
      />
    </div>
  );
}