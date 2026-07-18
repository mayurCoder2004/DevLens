import TechnicalDebtSummaryCards from "../technicalDebt/TechnicalDebtSummaryCards";

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
    </div>
  );
}