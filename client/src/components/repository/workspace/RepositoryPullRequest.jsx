import PullRequestChangedFiles from "../pullRequest/PullRequestChangedFiles";
import PullRequestOverview from "../pullRequest/PullRequestOverview";
import PullRequestRecommendations from "../pullRequest/PullRequestRecommendations";
import PullRequestRiskBreakdown from "../pullRequest/PullRequestRiskBreakdown";
import PullRequestSummaryCards from "../pullRequest/PullRequestSummaryCards";

export default function RepositoryPullRequest({
  pullRequestAnalysis,
}) {
  if (!pullRequestAnalysis) return null;

  return (
    <div className="space-y-8">
      <PullRequestSummaryCards
        pullRequestAnalysis={pullRequestAnalysis}
      />

      <PullRequestRiskBreakdown
        pullRequestAnalysis={pullRequestAnalysis}
      />

      <PullRequestOverview
        pullRequestAnalysis={pullRequestAnalysis}
      />

      <PullRequestRecommendations
        pullRequestAnalysis={pullRequestAnalysis}
      />

      <PullRequestChangedFiles
        pullRequestAnalysis={pullRequestAnalysis}
      />
    </div>
  );
}