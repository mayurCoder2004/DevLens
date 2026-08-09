import { Boxes, Rocket, Brain } from "lucide-react";

export default function RecentAnalyses() {
  const analyses = [
    {
      title: "Architecture Analysis",
      status: "Completed",
      time: "2 hours ago",
      icon: Boxes,
    },
    {
      title: "Deployment Analysis",
      status: "Completed",
      time: "Yesterday",
      icon: Rocket,
    },
    {
      title: "AI Review",
      status: "Pending",
      time: "Not Generated",
      icon: Brain,
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">Recent Analyses</h2>

        <p className="mt-2 text-slate-400">
          Latest engineering analyses available for this repository.
        </p>
      </div>

      <div className="space-y-4">
        {analyses.map((analysis) => {
          const Icon = analysis.icon;

          return (
            <div
              key={analysis.title}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-slate-800
                bg-slate-950
                p-5
              "
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-slate-800 p-3">
                  <Icon size={20} className="text-blue-400" />
                </div>

                <div>
                  <h3 className="font-medium text-white">{analysis.title}</h3>

                  <p className="mt-1 text-sm text-slate-400">{analysis.time}</p>
                </div>
              </div>

              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium
                  ${
                    analysis.status === "Completed"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }
                `}
              >
                {analysis.status}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
