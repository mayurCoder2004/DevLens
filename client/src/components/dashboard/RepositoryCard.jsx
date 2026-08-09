import { ArrowRight, Clock, Globe, Lock, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function RepositoryCard({
  repositoryName,
  repositoryOwner,
  description,
  language,
  stars,
  engineeringScore,
  lastUpdated,
  visibility,
  workspaceLink,
}) {
  // Language color mapping
  const languageColors = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-500",
    Python: "bg-blue-400",
    Java: "bg-red-500",
    Go: "bg-cyan-400",
    Ruby: "bg-red-400",
    PHP: "bg-indigo-400",
    Rust: "bg-orange-500",
    Swift: "bg-orange-400",
    Kotlin: "bg-purple-500",
    default: "bg-slate-400",
  };

  const languageColor = languageColors[language] || languageColors.default;

  // Engineering score badge styling
  const getScoreBadge = (score) => {
    if (score === null || score === undefined) {
      return "bg-slate-500/10 border-slate-500/20 text-slate-400";
    }

    if (score >= 90) {
      return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
    }

    if (score >= 70) {
      return "bg-blue-500/10 border-blue-500/20 text-blue-400";
    }

    if (score >= 50) {
      return "bg-yellow-500/10 border-yellow-500/20 text-yellow-400";
    }

    return "bg-red-500/10 border-red-500/20 text-red-400";
  };

  const isPrivate = visibility.toLowerCase() === "private";

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
    <article
      className="
        group
        flex
        h-full
        flex-col
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-5
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-blue-500/40
      "
    >
      {/* Header - Repository Name & Visibility */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3
            className="text-lg font-semibold text-white break-words"
            title={repositoryName}
          >
            {repositoryName}
          </h3>
          <p className="mt-1 break-words text-sm text-slate-500">
            @{repositoryOwner}
          </p>
        </div>

        <span
          className="
            flex
            flex-shrink-0
            items-center
            gap-1.5
            rounded-full
            border
            border-slate-700/50
            bg-slate-800/50
            px-2.5
            py-1
            text-xs
            font-medium
            text-slate-300
            whitespace-nowrap
          "
          aria-label={`Visibility: ${visibility}`}
        >
          {isPrivate ? (
            <Lock size={12} aria-hidden="true" />
          ) : (
            <Globe size={12} aria-hidden="true" />
          )}
          {visibility}
        </span>
      </div>

      {/* Description */}
      <p
        className="mt-3 text-sm leading-relaxed text-slate-400 line-clamp-2"
        title={description}
      >
        {description || "No description available."}
      </p>

      {/* Metadata - Language, Stars, Last Analysis */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
        {/* Language */}
        {language && (
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${languageColor}`}
              aria-hidden="true"
            />
            <span>{language}</span>
          </div>
        )}

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <Star size={14} className="text-yellow-400" aria-hidden="true" />
          <span>{stars?.toLocaleString() || 0}</span>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-slate-500" aria-hidden="true" />
          <span>{formatLastUpdated(lastUpdated)}</span>
        </div>
      </div>

      {/* Engineering Score */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/50 pt-3">
        <span className="text-sm text-slate-500">Engineering Score</span>

        <span
          className={`
            inline-flex
            items-center
            rounded-full
            border
            px-2.5
            py-1
            text-sm
            font-semibold
            whitespace-nowrap
            ${getScoreBadge(engineeringScore)}
          `}
          aria-label={`Engineering score: ${engineeringScore || "Not analyzed"}`}
        >
          {engineeringScore || "--"}
        </span>
      </div>

      {/* Footer - Open Workspace Button */}
      <div className="mt-auto pt-4">
        <Link
          to={workspaceLink}
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-blue-500/20
            bg-blue-500/10
            px-4
            py-2.5
            text-sm
            font-medium
            text-blue-400
            transition-all
            duration-200
            hover:bg-blue-500/20
            hover:border-blue-500/30
            hover:text-blue-300
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/40
            focus:ring-offset-2
            focus:ring-offset-slate-900
            group-hover:gap-3
          "
          aria-label={`Open workspace for ${repositoryName}`}
        >
          Open Workspace
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
