import { BookOpen, GitBranch, Star, User, Calendar, Code2 } from "lucide-react";

const formatAnalysisDate = (date) =>
  new Date(date).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const SummaryField = ({ icon, label, value }) => (
  <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
    <div className="mt-0.5 text-slate-400">{icon}</div>

    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold text-slate-900">
        {value || "Unknown"}
      </p>
    </div>
  </div>
);

const RepositorySummaryCard = ({ repository, generatedAt }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Repository Summary
          </p>

          <h2 className="mt-1 truncate text-2xl font-bold text-slate-950">
            {repository.name}
          </h2>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
          <Star size={15} className="text-yellow-500" />
          {repository.stars ?? 0} Stars
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SummaryField
          icon={<BookOpen size={18} />}
          label="Description"
          value={repository.description || "No description available"}
        />

        <SummaryField
          icon={<User size={18} />}
          label="Owner"
          value={repository.owner}
        />

        <SummaryField
          icon={<Code2 size={18} />}
          label="Language"
          value={repository.language || "Unknown"}
        />

        <SummaryField
          icon={<GitBranch size={18} />}
          label="Default Branch"
          value={repository.defaultBranch}
        />

        <SummaryField
          icon={<Star size={18} />}
          label="Stars"
          value={`${repository.stars ?? 0} Stars`}
        />

        <SummaryField
          icon={<Calendar size={18} />}
          label="Last Analysis"
          value={formatAnalysisDate(generatedAt)}
        />
      </div>
    </div>
  );
};

export default RepositorySummaryCard;
