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

export default function ChangedFileCard({ file }) {
  const [expanded, setExpanded] = useState(false);

  const getCategory = () => {
    const path = file.filename.toLowerCase();

    if (
      path.includes("kubernetes") ||
      path.includes("docker") ||
      path.includes("terraform") ||
      path.includes(".github")
    ) {
      return {
        label: "Infrastructure",
        icon: ServerCog,
        color: "bg-cyan-500/10 text-cyan-400",
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
        color: "bg-violet-500/10 text-violet-400",
      };
    }

    if (
      path.endsWith(".md") ||
      path.includes("docs")
    ) {
      return {
        label: "Documentation",
        icon: FileText,
        color: "bg-emerald-500/10 text-emerald-400",
      };
    }

    return {
      label: "Source Code",
      icon: FileCode2,
      color: "bg-blue-500/10 text-blue-400",
    };
  };

  const category = getCategory();
  const CategoryIcon = category.icon;

  const getStatusColor = () => {
    switch (file.status) {
      case "added":
        return "bg-emerald-500/10 text-emerald-400";

      case "removed":
        return "bg-red-500/10 text-red-400";

      case "renamed":
        return "bg-amber-500/10 text-amber-400";

      default:
        return "bg-blue-500/10 text-blue-400";
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60">
      <div className="p-6">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold text-white">
              {file.filename}
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor()}`}
              >
                {file.status}
              </span>

              <span
                className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${category.color}`}
              >
                <CategoryIcon className="h-3.5 w-3.5" />
                {category.label}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-lg bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
                +{file.additions}
              </span>

              <span className="rounded-lg bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400">
                -{file.deletions}
              </span>

              <span className="rounded-lg bg-slate-800 px-3 py-1 text-sm font-medium text-white">
                Δ {file.changes}
              </span>
            </div>
          </div>

          <a
            href={file.blob_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
          >
            View
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {file.patch && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}

              Patch Preview
            </button>

            {expanded && (
              <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-xs leading-6 text-slate-300">
                {file.patch}
              </pre>
            )}
          </>
        )}
      </div>
    </div>
  );
}