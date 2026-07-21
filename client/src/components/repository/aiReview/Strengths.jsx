import StrengthCard from "./StrengthCard";

const strengths = [
  {
    title: "Clean Project Structure",
    description:
      "The repository follows a modular organization that improves readability and long-term maintainability.",
  },
  {
    title: "Good Deployment Practices",
    description:
      "Deployment configuration is well organized and follows recommended engineering conventions.",
  },
  {
    title: "Consistent Naming Conventions",
    description:
      "Meaningful file, folder, and component names improve navigation and developer productivity.",
  },
];

export default function Strengths() {
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
        {strengths.map((strength) => (
          <StrengthCard
            key={strength.title}
            {...strength}
          />
        ))}
      </div>
    </section>
  );
}