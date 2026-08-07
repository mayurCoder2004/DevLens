import TechnicalDebtSummaryCards from "../technicalDebt/TechnicalDebtSummaryCards";
import TechnicalDebtAnalytics from "../technicalDebt/TechnicalDebtAnalytics";
import TechnicalDebtOverview from "../technicalDebt/TechnicalDebtOverview";
import TechnicalDebtInsights from "../technicalDebt/TechnicalDebtInsights";
import TechnicalDebtRecommendations from "../technicalDebt/TechnicalDebtRecommendations";
import TechnicalDebtFileBreakdown from "../technicalDebt/TechnicalDebtFileBreakdown";

export default function RepositoryTechnicalDebt({ technicalDebt }) {
  if (!technicalDebt) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-slate-400">
        Loading technical debt...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <TechnicalDebtSummaryCards technicalDebt={technicalDebt} />

      {/* Analytics */}
      <TechnicalDebtAnalytics technicalDebt={technicalDebt} />

      {/* AI Overview */}
      <TechnicalDebtOverview technicalDebt={technicalDebt} />

      {/* Details Section */}
      <div className="grid gap-8 xl:grid-cols-2">
        <TechnicalDebtInsights technicalDebt={technicalDebt} />

        <TechnicalDebtRecommendations technicalDebt={technicalDebt} />
      </div>

      {/* File Breakdown */}
      <TechnicalDebtFileBreakdown technicalDebt={technicalDebt} />
    </div>
  );
}