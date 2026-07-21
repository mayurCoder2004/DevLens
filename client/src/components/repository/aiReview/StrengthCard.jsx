import { CheckCircle2 } from "lucide-react";

export default function StrengthCard({
  title,
  description,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:border-slate-700">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-emerald-500/10 p-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>

          <p className="mt-3 leading-7 text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}