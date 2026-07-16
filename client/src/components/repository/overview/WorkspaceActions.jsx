import {
  Brain,
  RefreshCw,
  PlayCircle,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Analyze Repository",
      description:
        "Run complete repository analysis.",
      icon: PlayCircle,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Run AI Review",
      description:
        "Generate AI-powered engineering insights.",
      icon: Brain,
      color: "bg-violet-600 hover:bg-violet-700",
    },
    {
      title: "Refresh Analysis",
      description:
        "Sync the latest repository information.",
      icon: RefreshCw,
      color: "bg-emerald-600 hover:bg-emerald-700",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Workspace Actions
        </h2>

        <p className="mt-2 text-slate-400">
          Common actions for this repository.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className={`
                flex
                flex-col
                items-start
                rounded-xl
                ${action.color}
                p-6
                text-left
                text-white
                transition-all
                duration-200
                hover:-translate-y-1
              `}
            >
              <Icon size={28} />

              <h3 className="mt-5 text-lg font-semibold">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-white/80">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}