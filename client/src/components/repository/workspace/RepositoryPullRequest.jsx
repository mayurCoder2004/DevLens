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
    </div>
  );
}