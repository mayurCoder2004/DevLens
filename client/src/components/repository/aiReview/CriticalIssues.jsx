import CriticalIssueCard from "./CriticalIssueCard";

export default function CriticalIssues({ data }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Critical Issues
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          High-priority engineering concerns identified during repository
          analysis.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        {data.map((issue) => (
          <CriticalIssueCard
            key={issue.title}
            title={issue.title}
            severity={issue.severity}
            description={issue.description}
          />
        ))}
      </div>
    </section>
  );
}