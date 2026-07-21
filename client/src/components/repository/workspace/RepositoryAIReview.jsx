import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ActionPlan from "../aiReview/ActionPlan";
import AIExecutiveSummary from "../aiReview/AIExecutiveSummary";
import ArchitectureSuggestions from "../aiReview/ArchitectureSuggestions";
import CriticalIssues from "../aiReview/CriticalIssues";
import EngineeringScore from "../aiReview/EngineeringScore";
import Strengths from "../aiReview/Strengths";
import TechnologyInsights from "../aiReview/TechnologyInsights";
import { getRepositoryAIReview } from "../../../services/aiReview.service";

export default function RepositoryAIReview() {
  const { id } = useParams();

  const [review, setReview] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReview() {
      try {
        const data =
          await getRepositoryAIReview(id);

        setReview(data.review);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadReview();
  }, [id]);

  if (loading) {
    return <div>Loading AI Review...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!review) {
    return <div>No AI Review Available.</div>;
  }

  return (
    <div className="space-y-8">
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