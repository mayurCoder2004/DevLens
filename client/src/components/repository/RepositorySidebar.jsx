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
} from "lucide-react";

import { NavLink, useParams } from "react-router-dom";

export default function RepositorySidebar({ repository }) {
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
    <aside className="flex w-72 flex-col border-r border-slate-800 bg-[#0F172A]">
      {/* Repository Header */}
      <div className="border-b border-slate-800 p-6">
        {repository ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Repository
            </p>

            <h2 className="mt-3 truncate text-xl font-bold text-white">
              {repository.name}
            </h2>

            <p className="mt-1 truncate text-sm text-slate-400">
              @{repository.owner}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
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

      {/* Back */}
      <div className="border-b border-slate-800 p-4">
        <NavLink
          to="/repositories"
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Repositories
        </NavLink>
      </div>

      {/* Workspace */}
      <div className="flex-1 p-4">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Workspace
        </h3>

        <nav className="space-y-2">
          {navigation.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={`/repository/${repositoryId}/${path}`}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}