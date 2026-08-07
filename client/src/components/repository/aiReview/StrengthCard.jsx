import { CheckCircle2 } from "lucide-react";
import MarkdownText from "./MarkdownText";

export default function StrengthCard({
  title,
  description,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-800/60">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-emerald-500/10 p-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>

          <MarkdownText className="mt-3">{description}</MarkdownText>
        </div>
      </div>
    </div>
  );
}
