import ActionPlan from "../aiReview/ActionPlan";
import AIExecutiveSummary from "../aiReview/AIExecutiveSummary";
import CriticalIssues from "../aiReview/CriticalIssues";
import EngineeringScore from "../aiReview/EngineeringScore";
import Strengths from "../aiReview/Strengths";

export default function RepositoryAIReview() {
  return (
    <div className="space-y-8">
      <AIExecutiveSummary />

      <EngineeringScore />

      <CriticalIssues />

      <Strengths />

      <ActionPlan />
    </div>
  );
}