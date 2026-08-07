import PullRequestChangedFiles from "../pullRequest/PullRequestChangedFiles";
import PullRequestCodeReviewSummary from "../pullRequest/PullRequestCodeReviewSummary";
import PullRequestHero from "../pullRequest/PullRequestHero";
import PullRequestOverview from "../pullRequest/PullRequestOverview";
import PullRequestRecommendations from "../pullRequest/PullRequestRecommendations";
import PullRequestRiskBreakdown from "../pullRequest/PullRequestRiskBreakdown";
import PullRequestSummaryCards from "../pullRequest/PullRequestSummaryCards";

export default function RepositoryPullRequest({ pullRequestAnalysis }) {
  if (!pullRequestAnalysis) return null;

  return (
    <div className="space-y-8">
      <PullRequestHero pullRequestAnalysis={pullRequestAnalysis} />

      <PullRequestSummaryCards pullRequestAnalysis={pullRequestAnalysis} />

      <PullRequestOverview pullRequestAnalysis={pullRequestAnalysis} />

      <div className="grid gap-8 xl:grid-cols-2">
        <PullRequestRiskBreakdown pullRequestAnalysis={pullRequestAnalysis} />

        <PullRequestRecommendations pullRequestAnalysis={pullRequestAnalysis} />
      </div>

      <PullRequestChangedFiles pullRequestAnalysis={pullRequestAnalysis} />

      <PullRequestCodeReviewSummary pullRequestAnalysis={pullRequestAnalysis} />
    </div>
  );
}
