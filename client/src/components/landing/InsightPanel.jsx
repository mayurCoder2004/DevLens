import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const recommendations = [
  "Split AuthService into smaller modules",
  "Increase integration test coverage",
  "Reduce frontend bundle size",
];

export default function InsightPanel() {
  return (
    <aside className="flex flex-col border-l border-slate-800 bg-slate-950/50">

      {/* Header */}

      <div className="border-b border-slate-800 p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">

            <Sparkles
              size={20}
              className="text-blue-400"
            />

          </div>

          <div>

            <h3 className="font-semibold text-white">
              AI Copilot
            </h3>

            <p className="text-xs text-slate-500">
              Engineering Intelligence
            </p>

          </div>

        </div>

      </div>

      <div className="flex-1 overflow-y-auto p-5">

        {/* Repository Health */}

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4">

          <div className="flex items-center gap-2">

            <ShieldCheck
              size={18}
              className="text-green-400"
            />

            <span className="font-medium text-green-400">
              Repository Healthy
            </span>

          </div>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            Strong architecture, healthy deployment readiness,
            and maintainable project structure.
          </p>

        </div>

        {/* AI Summary */}

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            AI Summary
          </h4>

          <p className="mt-4 text-sm leading-7 text-slate-300">
            DevLens analyzed repository structure,
            dependencies, deployment configuration,
            and engineering health.

            The repository follows good engineering
            practices with only a few improvements
            recommended for long-term scalability.
          </p>

        </div>

        {/* Recommendations */}

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Top Recommendations
          </h4>

          <div className="mt-5 space-y-4">

            {recommendations.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3"
              >

                <CheckCircle2
                  size={18}
                  className="mt-0.5 text-blue-400"
                />

                <span className="text-sm leading-6 text-slate-300">
                  {item}
                </span>

              </div>
            ))}

          </div>

        </div>

        {/* Risk */}

        <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">

          <div className="flex items-center gap-2">

            <AlertTriangle
              size={18}
              className="text-yellow-400"
            />

            <span className="font-medium text-yellow-400">
              Risk Level: Low
            </span>

          </div>

          <p className="mt-3 text-sm text-slate-300">
            No critical engineering risks detected.
          </p>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">

        <button
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-3
            text-sm
            font-medium
            text-white
            transition-all
            duration-200
            hover:bg-blue-700
          "
        >
          Open Full Report

          <ArrowRight size={16} />

        </button>

      </div>

    </aside>
  );
}