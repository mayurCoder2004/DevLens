import TechnicalDebtSummaryCards from "../technicalDebt/TechnicalDebtSummaryCards";
import TechnicalDebtAnalytics from "../technicalDebt/TechnicalDebtAnalytics";
import TechnicalDebtOverview from "../technicalDebt/TechnicalDebtOverview";
import TechnicalDebtInsights from "../technicalDebt/TechnicalDebtInsights";
import TechnicalDebtRecommendations from "../technicalDebt/TechnicalDebtRecommendations";

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
  <TechnicalDebtSummaryCards technicalDebt={technicalDebt} />

  <TechnicalDebtAnalytics technicalDebt={technicalDebt} />

  <TechnicalDebtOverview technicalDebt={technicalDebt} />

<div className="grid gap-8 xl:grid-cols-2">
  <TechnicalDebtInsights technicalDebt={technicalDebt} />

  <TechnicalDebtRecommendations technicalDebt={technicalDebt} />
</div>
</div>
  );
}