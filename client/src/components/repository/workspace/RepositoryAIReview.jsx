import ActionPlan from "../aiReview/ActionPlan";
import AIExecutiveSummary from "../aiReview/AIExecutiveSummary";
import ArchitectureSuggestions from "../aiReview/ArchitectureSuggestions";
import CriticalIssues from "../aiReview/CriticalIssues";
import EngineeringScore from "../aiReview/EngineeringScore";
import Strengths from "../aiReview/Strengths";
import TechnologyInsights from "../aiReview/TechnologyInsights";

export default function RepositoryAIReview({
  review,
  generating,
  onRefresh,
}) {
  if (!review) return null;

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          onClick={onRefresh}
          disabled={generating}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
        >
          {generating
            ? "Refreshing..."
            : "Refresh AI Review"}
        </button>
      </div>

      <AIExecutiveSummary
        data={review.executiveSummary}
      />

      <EngineeringScore
        data={review.engineeringScore}
      />

      <CriticalIssues
        data={review.criticalIssues}
      />

      <Strengths
        data={review.strengths}
      />

      <ActionPlan
        data={review.actionPlan}
      />

      <TechnologyInsights
        data={review.technologyInsights}
      />

      <ArchitectureSuggestions
        data={review.architectureSuggestions}
      />
    </div>
  );
}