import EngineeringHealthBreakdown from "../engineeringHealth/EngineeringHealthBreakdown";
import EngineeringHealthOverview from "../engineeringHealth/EngineeringHealthOverview";
import EngineeringHealthSummaryCards from "../engineeringHealth/EngineeringHealthSummaryCards";
import EngineeringInsights from "../engineeringHealth/EngineeringInsights";
import EngineeringRecommendations from "../engineeringHealth/EngineeringRecommendations";
import EngineeringScoreBreakdown from "../engineeringHealth/EngineeringScoreBreakdown";

export default function RepositoryEngineeringHealth({ engineeringHealth }) {
  if (!engineeringHealth) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-slate-400">
        Loading engineering health...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <EngineeringHealthSummaryCards engineeringHealth={engineeringHealth} />

      {/* Analytics */}
      <EngineeringScoreBreakdown engineeringHealth={engineeringHealth} />

      {/* AI Overview */}
      <EngineeringHealthOverview engineeringHealth={engineeringHealth} />

      {/* Details Section */}
      <div className="grid gap-8 xl:grid-cols-2">
        <EngineeringInsights engineeringHealth={engineeringHealth} />

        <EngineeringRecommendations engineeringHealth={engineeringHealth} />
      </div>

      {/* Score Breakdown */}
      <EngineeringHealthBreakdown engineeringHealth={engineeringHealth} />
    </div>
  );
}
