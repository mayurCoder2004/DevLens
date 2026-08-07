import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileCode2,
  FileText,
  Package,
  ServerCog,
} from "lucide-react";

const getCategory = (filename = "") => {
  const path = filename.toLowerCase();

  if (
    path.includes("kubernetes") ||
    path.includes("docker") ||
    path.includes("terraform") ||
    path.includes(".github")
  ) {
    return {
      label: "Infrastructure",
      icon: ServerCog,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
      badge: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30",
    };
  }

  if (
    path.includes("package.json") ||
    path.includes("package-lock.json") ||
    path.includes("pom.xml") ||
    path.includes("requirements.txt")
  ) {
    return {
      label: "Dependencies",
      icon: Package,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
      badge: "bg-violet-500/15 text-violet-400 border border-violet-500/30",
    };
  }

  if (path.endsWith(".md") || path.includes("docs")) {
    return {
      label: "Documentation",
      icon: FileText,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      badge: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    };
  }

  return {
    label: "Source Code",
    icon: FileCode2,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    badge: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  };
};

const STATUS_BADGE = {
  added: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  removed: "bg-red-500/15 text-red-400 border border-red-500/30",
  renamed: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  modified: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
};

export default function ChangedFileCard({ file }) {
  const [expanded, setExpanded] = useState(false);

  const category = getCategory(file.filename);
  const CategoryIcon = category.icon;
  const statusBadge = STATUS_BADGE[file.status] ?? STATUS_BADGE.modified;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 transition-colors hover:border-slate-700">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${category.iconBg}`}
              >
                <CategoryIcon className={`h-4 w-4 ${category.iconColor}`} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="break-words text-sm font-semibold text-white">
                  {file.filename}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusBadge}`}
                  >
                    {file.status}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${category.badge}`}
                  >
                    <CategoryIcon className="h-3 w-3" />
                    {category.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
                +{file.additions}
              </span>

              <span className="rounded-lg bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-400">
                -{file.deletions}
              </span>

              <span className="rounded-lg bg-slate-800 px-3 py-1 text-sm font-semibold text-slate-300">
                {file.changes} changed
              </span>
            </div>
          </div>

          {file.blob_url && (
            <a
              href={file.blob_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-600 hover:text-white sm:w-auto"
            >
              View
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {file.patch && (
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setExpanded((current) => !current)}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
            >
              {expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              Patch Preview
            </button>

            {expanded && (
              <pre className="mt-4 max-h-[520px] overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs leading-6 text-slate-300">
                {file.patch}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
