import {
  ArrowLeft,
  LayoutDashboard,
  ChartColumn,
  Boxes,
  Wrench,
  Rocket,
  Activity,
  GitPullRequest,
  Sparkles,
  Globe,
  Lock,
  Star,
  X,
} from "lucide-react";

import { NavLink, useParams } from "react-router-dom";

export default function RepositorySidebar({ repository, onClose }) {
  const { repositoryId } = useParams();

  const navigation = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      path: "overview",
    },
    {
      label: "Architecture",
      icon: Boxes,
      path: "architecture",
    },
    {
      label: "Technical Debt",
      icon: Wrench,
      path: "technical-debt",
    },
    {
      label: "Deployment",
      icon: Rocket,
      path: "deployment",
    },
    {
      label: "Engineering Health",
      icon: Activity,
      path: "engineering-health",
    },
    {
      label: "Pull Requests",
      icon: GitPullRequest,
      path: "pull-requests",
    },
    {
      label: "AI Review",
      icon: Sparkles,
      path: "ai-review",
    },
  ];

  return (
    <aside className="flex h-screen w-[270px] sm:w-72 flex-col border-r border-slate-800 bg-[#0F172A]">
      {/* Repository Header */}
      <div className="border-b border-slate-800 p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 lg:mb-0">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Repository
            </p>

            {repository ? (
              <>
                <h2 className="mt-3 truncate text-lg sm:text-xl font-bold text-white">
                  {repository.name}
                </h2>

                <p className="mt-1 truncate text-sm text-slate-400">
                  @{repository.owner}
                </p>

                <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    {repository.private ? (
                      <Lock size={14} />
                    ) : (
                      <Globe size={14} />
                    )}

                    {repository.private ? "Private" : "Public"}
                  </div>

                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400" />
                    {repository.stars}
                  </div>
                </div>

                {repository.language && (
                  <div className="mt-2 text-xs text-slate-500">
                    {repository.language}
                  </div>
                )}
              </>
            ) : (
              <div className="text-slate-400">Loading...</div>
            )}
          </div>

          {/* Close button for mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Back */}
      <div className="border-b border-slate-800 p-3 sm:p-4">
        <NavLink
          to="/repositories"
          onClick={onClose}
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Repositories
        </NavLink>
      </div>

      {/* Workspace */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <h3 className="mb-3 sm:mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Workspace
        </h3>

        <nav className="space-y-1.5 sm:space-y-2">
          {navigation.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={`/repository/${repositoryId}/${path}`}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2 sm:gap-3 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
