import ArchitectureSummaryCards from "./ArchitectureSummaryCards";
import ArchitectureGraphCard from "./ArchitectureGraphCard";
import ArchitectureInsights from "./ArchitectureInsights";
import ArchitectureRecommendations from "./ArchitectureRecommendations";

export default function RepositoryArchitecture({
  architecture,
}) {
  return (
    <div className="space-y-8">
      <ArchitectureSummaryCards
        architecture={architecture}
      />

      <ArchitectureGraphCard
  architecture={architecture}
/>

      <div className="grid gap-8 lg:grid-cols-2">
        <ArchitectureInsights />

        <ArchitectureRecommendations />
      </div>
    </div>
  );
}