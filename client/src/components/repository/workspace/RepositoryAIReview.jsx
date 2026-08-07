import ActionPlan from "../aiReview/ActionPlan";
import AIExecutiveSummary from "../aiReview/AIExecutiveSummary";
import AIReviewHero from "../aiReview/AIReviewHero";
import AIReviewRecommendations from "../aiReview/AIReviewRecommendations";
import CriticalIssues from "../aiReview/CriticalIssues";
import EngineeringScore from "../aiReview/EngineeringScore";
import ReviewMetadata from "../aiReview/ReviewMetadata";
import Strengths from "../aiReview/Strengths";

export default function RepositoryAIReview({ repository, review }) {
  if (!review) return null;

  return (
    <div className="space-y-8">
      <AIReviewHero review={review} />

      <AIExecutiveSummary data={review.executiveSummary} />

      <EngineeringScore data={review.engineeringScore} />

      <div className="grid gap-8 xl:grid-cols-2">
        <Strengths data={review.strengths} />

        <CriticalIssues data={review.criticalIssues} />
      </div>

      <ActionPlan data={review.actionPlan} />

      <AIReviewRecommendations
        architectureSuggestions={review.architectureSuggestions}
        technologyInsights={review.technologyInsights}
      />

      <ReviewMetadata repository={repository} review={review} />
    </div>
  );
}
