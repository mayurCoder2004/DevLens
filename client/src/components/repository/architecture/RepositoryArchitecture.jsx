import ArchitectureSummaryCards from "./ArchitectureSummaryCards";
import ArchitectureGraphCard from "./ArchitectureGraphCard";
import ArchitectureAnalytics from "./ArchitectureAnalytics";
import ArchitectureInsights from "./ArchitectureInsights";
import ArchitectureRecommendations from "./ArchitectureRecommendations";
import ArchitectureRecommendationOverview from "./ArchitectureRecommendationOverview";

export default function RepositoryArchitecture({
  architecture,
  analytics,
  insights,
  recommendations,
}) {
  return (
    <div className="space-y-8">
      {/* Repository Summary */}
      <ArchitectureSummaryCards architecture={architecture} />

      {/* Architecture Graph */}
      <ArchitectureGraphCard architecture={architecture} />

      {/* Analytics */}
      <ArchitectureAnalytics analytics={analytics} />

      {/* NEW: Full Width AI Overview */}
      <ArchitectureRecommendationOverview recommendations={recommendations} />

      {/* Details Section */}
      <div className="grid gap-8 xl:grid-cols-2">
        <ArchitectureInsights insights={insights} />

        <ArchitectureRecommendations recommendations={recommendations} />
      </div>
    </div>
  );
}
