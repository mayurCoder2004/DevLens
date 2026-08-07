import {
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import MarkdownText from "./MarkdownText";

export default function TechnologyCard({
  icon: Icon,
  name,
  category,
  insight,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-800/60">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-violet-500/10 p-3">
            <Icon className="h-6 w-6 text-violet-400" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {name}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {category}
            </p>
          </div>
        </div>

        <ArrowUpRight className="h-5 w-5 text-slate-500" />
      </div>

      <div className="mt-6 rounded-lg border border-violet-500/20 bg-violet-500/5 p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 text-violet-400" />

          <div>
            <p className="text-sm font-medium text-violet-300">
              AI Insight
            </p>

            <MarkdownText className="mt-2">{insight}</MarkdownText>
          </div>
        </div>
      </div>
    </div>
  );
}
