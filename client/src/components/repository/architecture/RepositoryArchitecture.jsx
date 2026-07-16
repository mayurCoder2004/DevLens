import ArchitectureSummaryCards from "./ArchitectureSummaryCards";
import ArchitectureGraphCard from "./ArchitectureGraphCard";
import ArchitectureInsights from "./ArchitectureInsights";
import ArchitectureRecommendations from "./ArchitectureRecommendations";
import ArchitectureAnalytics from "./ArchitectureAnalytics";

export default function RepositoryArchitecture({
  architecture,
  analytics,
  insights,
}) {
  return (
    <div className="space-y-8">
  <ArchitectureSummaryCards
    architecture={architecture}
  />

  <ArchitectureGraphCard
    architecture={architecture}
  />

  <ArchitectureAnalytics
    analytics={analytics}
  />

  <div className="grid gap-8 lg:grid-cols-2">
    <ArchitectureInsights
  insights={insights}
/>

    <ArchitectureRecommendations />
  </div>
</div>
  );
}