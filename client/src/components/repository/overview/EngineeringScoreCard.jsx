import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function EngineeringScoreCard({
  score = 84,
  status = "Excellent Repository Health",
  analyzing = false,
  onAnalyze,
}) {
  const getScoreColor = () => {
    if (score >= 90) {
      return "text-emerald-400";
    }

    if (score >= 75) {
      return "text-blue-400";
    }

    if (score >= 60) {
      return "text-yellow-400";
    }

    return "text-red-400";
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
            <Sparkles size={16} />

            Engineering Intelligence
          </div>

          <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
            Overall Engineering Score
          </h2>

          <p className="mt-3 max-w-xl text-slate-400">
            A consolidated health score generated from
            architecture, deployment readiness,
            technical debt, engineering health,
            and AI-powered repository analysis.
          </p>
        </div>

        <div className="flex w-full flex-col items-center rounded-2xl border border-slate-800 bg-slate-950 px-5 py-6 sm:w-auto sm:px-10 sm:py-8">
          <span
            className={`text-5xl font-bold sm:text-7xl ${getScoreColor()}`}
          >
            {score}
          </span>

          <span className="mt-3 text-sm text-slate-400">
            {status}
          </span>

          <button
            onClick={onAnalyze}
            disabled={analyzing}
            className="
              mt-8
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-blue-600
              px-5
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:w-auto
            "
          >
            {analyzing
              ? "Analyzing..."
              : "Analyze Repository"}

            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
