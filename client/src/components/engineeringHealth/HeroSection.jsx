import { Activity } from "lucide-react";

const statusBadgeClasses = {
  Excellent: "bg-green-100 text-green-700 ring-green-200",
  Healthy: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Good: "bg-blue-100 text-blue-700 ring-blue-200",
  "Needs Attention": "bg-yellow-100 text-yellow-800 ring-yellow-200",
  Critical: "bg-red-100 text-red-700 ring-red-200",
};

const formatAnalysisDate = (date) =>
  new Date(date).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const HeroSection = ({
  engineeringScore,
  status,
  generatedAt,
}) => {
  const badgeClass =
    statusBadgeClasses[status] ||
    "bg-slate-100 text-slate-700 ring-slate-200";

  return (
    <div className="engineering-health-hero overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-900 p-6 text-white shadow-lg sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">
            Engineering Health Dashboard
          </p>

          <div className="mt-4 flex flex-wrap items-end gap-x-5 gap-y-3">
            <div className="text-7xl font-bold leading-none tracking-normal sm:text-8xl">
              {engineeringScore}
            </div>

            <div className="pb-1">
              <p className="text-base font-semibold text-white">
                Overall Engineering Score
              </p>

              <div
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${badgeClass}`}
              >
                {status}
              </div>
            </div>
          </div>

          <div className="mt-5 text-sm text-blue-100">
            <span className="font-semibold text-white">Last analyzed:</span>{" "}
            {formatAnalysisDate(generatedAt)}
          </div>
        </div>

        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-white/20 bg-white/10 shadow-inner backdrop-blur sm:h-32 sm:w-32">
          <Activity size={64} className="text-blue-100" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
