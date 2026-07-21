import { FolderGit2 } from "lucide-react";
import ChangedFileCard from "./ChangedFileCard";

export default function PullRequestChangedFiles({
  pullRequestAnalysis,
}) {
  if (!pullRequestAnalysis) return null;

  const files = pullRequestAnalysis.changedFiles || [];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-lg bg-blue-500/10 p-3">
          <FolderGit2 className="h-6 w-6 text-blue-400" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">
            Changed Files
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Inspect every modified file in this pull request,
            including file classification, statistics and patch
            preview.
          </p>
        </div>
      </div>

      {files.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 py-16 text-center text-slate-400">
          No changed files found.
        </div>
      ) : (
        <div className="space-y-6">
          {files.map((file) => (
            <ChangedFileCard
              key={file.sha}
              file={file}
            />
          ))}
        </div>
      )}
    </section>
  );
}