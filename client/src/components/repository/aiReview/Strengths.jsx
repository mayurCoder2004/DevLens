import StrengthCard from "./StrengthCard";

export default function Strengths({ data }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Repository Strengths
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Positive engineering practices recognized during
          repository analysis.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        {data.map((strength) => (
          <StrengthCard
            key={strength.title}
            title={strength.title}
            description={strength.description}
          />
        ))}
      </div>
    </section>
  );
}