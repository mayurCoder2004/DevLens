import EngineeringScoreCard from "./EngineeringScoreCard";

export default function EngineeringScore({ data }) {
  if (!data) {
    return null;
  }

  const getDescription = (title, score) => {
    if (score >= 85) {
      switch (title) {
        case "Maintainability":
          return "Code organization and repository structure are highly maintainable.";
        case "Security":
          return "Security practices are well implemented with only minor improvements possible.";
        case "Architecture":
          return "Architecture is modular, scalable, and well designed.";
        case "Testing":
          return "Testing practices provide strong confidence in code quality.";
        case "Documentation":
          return "Documentation is comprehensive and developer-friendly.";
        case "Scalability":
          return "Current architecture is well prepared for future growth.";
        default:
          return "Excellent engineering quality.";
      }
    }

    if (score >= 60) {
      switch (title) {
        case "Maintainability":
          return "Repository is maintainable but could benefit from additional refactoring.";
        case "Security":
          return "Security foundation is present, with opportunities for hardening.";
        case "Architecture":
          return "Architecture is generally solid with room for improvement.";
        case "Testing":
          return "Basic testing exists but coverage should be expanded.";
        case "Documentation":
          return "Documentation covers the basics but can be improved.";
        case "Scalability":
          return "Project can scale with some architectural improvements.";
        default:
          return "Good engineering quality with room for improvement.";
      }
    }

    switch (title) {
      case "Maintainability":
        return "Maintainability requires significant improvement.";
      case "Security":
        return "Security needs immediate attention.";
      case "Architecture":
        return "Architecture should be strengthened for long-term growth.";
      case "Testing":
        return "Testing coverage is insufficient and should be prioritized.";
      case "Documentation":
        return "Documentation is limited and should be expanded.";
      case "Scalability":
        return "Current design may struggle as the project grows.";
      default:
        return "Needs improvement.";
    }
  };

  const engineeringScores = [
    {
      title: "Maintainability",
      score: data.maintainability,
    },
    {
      title: "Security",
      score: data.security,
    },
    {
      title: "Architecture",
      score: data.architecture,
    },
    {
      title: "Testing",
      score: data.testing,
    },
    {
      title: "Documentation",
      score: data.documentation,
    },
    {
      title: "Scalability",
      score: data.scalability,
    },
  ].map((metric) => ({
    ...metric,
    description: getDescription(metric.title, metric.score),
  }));

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Engineering Score
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            AI-generated evaluation across the key engineering dimensions of the
            repository.
          </p>
        </div>

        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 px-6 py-4 text-center">
          <p className="text-sm text-violet-300">
            Overall Score
          </p>

          <h3 className="mt-1 text-4xl font-bold text-white">
            {data.overall}
            <span className="text-xl text-slate-400">
              /100
            </span>
          </h3>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {engineeringScores.map((metric) => (
          <EngineeringScoreCard
            key={metric.title}
            {...metric}
          />
        ))}
      </div>
    </section>
  );
}