import EngineeringHealthOverview from "../engineeringHealth/EngineeringHealthOverview";
import EngineeringHealthSummaryCards from "../engineeringHealth/EngineeringHealthSummaryCards";
import EngineeringScoreBreakdown from "../engineeringHealth/EngineeringScoreBreakdown";

export default function RepositoryEngineeringHealth({
  engineeringHealth,
}) {
  return (
    <div className="space-y-8">
  <EngineeringHealthSummaryCards
    engineeringHealth={engineeringHealth}
  />

  <EngineeringScoreBreakdown
    engineeringHealth={engineeringHealth}
  />

  <EngineeringHealthOverview
    engineeringHealth={engineeringHealth}
  />
</div>
  );
}