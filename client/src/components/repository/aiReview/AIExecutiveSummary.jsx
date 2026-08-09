import { Brain, Sparkles, TrendingUp } from "lucide-react";
import MarkdownText from "./MarkdownText";

export default function AIExecutiveSummary({ data }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-6">
      <div className="mb-8 flex items-start gap-3">
        <div className="rounded-xl bg-yellow-500/10 p-3">
          <Sparkles className="h-6 w-6 text-yellow-400" />
        </div>

        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-white">Executive Summary</h2>
          <p className="mt-1 text-slate-400">
            High-level repository assessment and engineering summary.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-slate-400">Review Type</h3>
            <div className="rounded-xl bg-slate-900/60 p-3">
              <Brain className="h-5 w-5 text-violet-400" />
            </div>
          </div>

          <p className="mt-8 text-2xl font-bold text-white">AI Review</p>
          <p className="mt-3 text-sm text-slate-500">
            Consolidated repository assessment
          </p>
        </div>

        <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Repository Assessment
            </h3>
          </div>

          <MarkdownText>
            {data?.assessment ||
              "No AI assessment is currently available for this repository."}
          </MarkdownText>

          <div className="my-6 border-t border-slate-800" />

          <h3 className="mb-4 text-lg font-semibold text-white">
            Engineering Summary
          </h3>

          <MarkdownText>
            {data?.engineeringSummary ||
              "Engineering summary is not available."}
          </MarkdownText>
        </div>
      </div>
    </section>
  );
}
