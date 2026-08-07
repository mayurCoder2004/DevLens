import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export default function DeploymentInsights({ title, items = [], type = "info" }) {
  const config = {
    success: {
      icon: CheckCircle2,
      iconColor: "text-emerald-400",
      bgColor: "bg-emerald-500/5",
      borderColor: "border-emerald-500/20",
      emptyMessage: "No strengths detected yet.",
    },
    warning: {
      icon: AlertTriangle,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-500/5",
      borderColor: "border-amber-500/20",
      emptyMessage: "No warnings detected.",
    },
    error: {
      icon: XCircle,
      iconColor: "text-red-400",
      bgColor: "bg-red-500/5",
      borderColor: "border-red-500/20",
      emptyMessage: "No critical issues found.",
    },
  };

  const settings = config[type] || config.info;
  const Icon = settings.icon;

  return (
    <section
      className={`rounded-2xl border ${settings.borderColor} ${settings.bgColor} p-6`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`rounded-lg ${settings.bgColor} border ${settings.borderColor} p-2`}
        >
          <Icon className={`h-5 w-5 ${settings.iconColor}`} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-slate-500">{items.length} items</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {items.length === 0 ? (
          <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-5 text-center">
            <p className="text-sm text-slate-400">{settings.emptyMessage}</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-4"
            >
              <Icon
                className={`mt-0.5 h-4 w-4 flex-shrink-0 ${settings.iconColor}`}
              />

              <p className="text-sm leading-6 text-slate-300">{item}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}