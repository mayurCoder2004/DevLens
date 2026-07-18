import EngineeringHealthSummaryCards from "../engineeringHealth/EngineeringHealthSummaryCards";

export default function RepositoryEngineeringHealth({
  engineeringHealth,
}) {
  return (
    <div className="space-y-8">
  <EngineeringHealthSummaryCards
    engineeringHealth={engineeringHealth}
  />
</div>
  );
}