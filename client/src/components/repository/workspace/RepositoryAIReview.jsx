import ActionPlan from "../aiReview/ActionPlan";
import AIExecutiveSummary from "../aiReview/AIExecutiveSummary";
import ArchitectureSuggestions from "../aiReview/ArchitectureSuggestions";
import CriticalIssues from "../aiReview/CriticalIssues";
import EngineeringScore from "../aiReview/EngineeringScore";
import Strengths from "../aiReview/Strengths";
import TechnologyInsights from "../aiReview/TechnologyInsights";

export default function RepositoryAIReview() {
  return (
    <div className="space-y-8">
      <AIExecutiveSummary />

      <EngineeringScore />

      <CriticalIssues />

      <Strengths />

      <ActionPlan />

      <TechnologyInsights />

      <ArchitectureSuggestions />
    </div>
  );
}