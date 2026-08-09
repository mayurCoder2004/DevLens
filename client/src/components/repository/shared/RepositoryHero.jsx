import { Calendar, Globe, Lock, Star } from "lucide-react";

export default function RepositoryHero({ repository }) {
  if (!repository) return null;

  const formatLastUpdated = (date) => {
    if (!date) return "Unknown";

    const diff = Date.now() - new Date(date).getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days} days ago`;

    return new Date(date).toLocaleDateString();
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-8">
      {/* Owner */}
      <p className="text-sm text-slate-500">{repository.owner}</p>

      {/* Repository Name */}
      <h1 className="mt-2 break-words text-2xl font-bold text-white sm:text-3xl">
        {repository.name}
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
        {repository.description || "No description available."}
      </p>

      {/* Metadata */}
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          {repository.private ? <Lock size={16} /> : <Globe size={16} />}

          <span>{repository.private ? "Private" : "Public"}</span>
        </div>

        {repository.language && (
          <div className="flex items-center gap-2">
            <span>{repository.language}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Star size={16} />

          <span>{repository.stars}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} />

          <span>{formatLastUpdated(repository.updatedAtGithub)}</span>
        </div>
      </div>
    </section>
  );
}
