import AIExecutiveSummary from "../aiReview/AIExecutiveSummary";
import EngineeringScore from "../aiReview/EngineeringScore";

export default function RepositoryAIReview() {
  return (
    <div className="space-y-8">
      <AIExecutiveSummary />
      <EngineeringScore />
    </div>
  );
}