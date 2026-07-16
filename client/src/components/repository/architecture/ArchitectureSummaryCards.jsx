import ArchitectureMetricCard from "./ArchitectureMetricCard";

export default function ArchitectureSummaryCards({
  architecture,
}) {
    if (!architecture) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-slate-400">
      Loading architecture...
    </div>
  );
}
    const getComplexityLevel = (score) => {
  if (score >= 85) return "Low";
  if (score >= 70) return "Medium";
  return "High";
};
  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Repository Architecture
        </h1>

        <p className="mt-2 text-slate-400">
          Understand the structure, complexity, and maintainability of your repository.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <ArchitectureMetricCard
  title="Architecture Score"
  value={architecture.complexityScore}
  subtitle="Overall"
/>

        <ArchitectureMetricCard
  title="Modules"
  value={architecture.nodeCount}
  subtitle="Detected"
/>

        <ArchitectureMetricCard
  title="Circular Dependencies"
  value={
    architecture.hasCircularDependency
      ? "Yes"
      : "No"
  }
  subtitle="Detected"
 />

        <ArchitectureMetricCard
  title="Complexity"
  value={getComplexityLevel(architecture.complexityScore)}
  subtitle={`${architecture.complexityScore} Score`}
/>
      </div>
    </section>
  );
}