import { BadgeCheck } from "lucide-react";
import StrengthCard from "./StrengthCard";

export default function Strengths({ data }) {
  const strengths = data || [];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-emerald-500/10 p-2">
          <BadgeCheck className="h-6 w-6 text-emerald-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Repository Strengths
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Positive engineering practices recognized during repository
            analysis.
          </p>
        </div>
      </div>

      {strengths.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 py-14 text-center">
          <BadgeCheck className="mx-auto h-12 w-12 text-slate-500" />
          <h3 className="mt-5 text-xl font-semibold text-white">
            No Strengths Listed
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            The AI review did not return repository strengths for this run.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {strengths.map((strength, index) => (
            <StrengthCard
              key={strength.title || index}
              title={strength.title}
              description={strength.description}
            />
          ))}
        </div>
      )}
    </section>
  );
}
