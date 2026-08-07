import { FolderGit2 } from "lucide-react";
import ChangedFileCard from "./ChangedFileCard";

export default function PullRequestChangedFiles({ pullRequestAnalysis }) {
  if (!pullRequestAnalysis) return null;

  const files = pullRequestAnalysis.changedFiles || [];

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Changed Files</h2>

        <p className="mt-2 text-slate-400">
          Every modified file in this pull request with classification, stats,
          and patch preview.
        </p>
      </div>

      {files.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 px-8 py-14 text-center sm:px-10 sm:py-16">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10">
            <FolderGit2 className="h-7 w-7 text-blue-400" />
          </div>

          <h3 className="text-xl font-semibold text-white">No Files Found</h3>

          <p className="mt-2 text-sm text-slate-400">
            No changed files were found for this pull request.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {files.map((file) => (
            <ChangedFileCard key={file.sha} file={file} />
          ))}
        </div>
      )}
    </section>
  );
}
