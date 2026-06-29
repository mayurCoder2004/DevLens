import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Info,
  X,
  XCircle,
} from "lucide-react";

function clampScore(score) {
  const parsed = Number(score) || 0;
  return Math.max(0, Math.min(100, parsed));
}

function getScoreColor(score) {
  const value = clampScore(score);

  if (value >= 80) return "bg-emerald-500";
  if (value >= 50) return "bg-amber-500";
  return "bg-rose-500";
}

function humanizeKey(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function FindingList({ title, items, icon: Icon, className }) {
  if (!items?.length) return null;

  return (
    <div>
      <h3 className={`mb-3 flex items-center gap-2 font-semibold ${className}`}>
        <Icon className="h-4 w-4" aria-hidden="true" />
        {title}
      </h3>

      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AnalysisCard({
  title,
  score,
  checks,
  strengths,
  warnings,
  criticalIssues,
}) {
  const value = clampScore(score);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">
            Analyzer checks and findings for this category.
          </p>
        </div>

        <span className="text-3xl font-bold tracking-tight text-slate-950">
          {value}
          <span className="text-base font-semibold text-slate-400">/100</span>
        </span>
      </div>

      <div className="mb-6 h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${getScoreColor(value)} transition-all duration-1000 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>

      <div className="mb-6">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-slate-800">
          <Info className="h-4 w-4" aria-hidden="true" />
          Checks
        </h3>

        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(checks || {}).map(([key, checkValue]) => (
            <div
              key={key}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <span className="text-sm font-semibold text-slate-700">
                {humanizeKey(key)}
              </span>

              {checkValue ? (
                <span className="rounded-full bg-emerald-50 p-1.5 text-emerald-700 ring-1 ring-emerald-200">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 p-1.5 text-slate-500 ring-1 ring-slate-200">
                  <X className="h-4 w-4" aria-hidden="true" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <FindingList
          title="Strengths"
          items={strengths}
          icon={CheckCircle2}
          className="text-emerald-700"
        />
        <FindingList
          title="Warnings"
          items={warnings}
          icon={AlertTriangle}
          className="text-amber-700"
        />
        <FindingList
          title="Critical Issues"
          items={criticalIssues}
          icon={XCircle}
          className="text-rose-700"
        />
      </div>
    </section>
  );
}
