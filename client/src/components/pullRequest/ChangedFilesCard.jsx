import {
  FileCode2,
  FileDiff,
  FileMinus2,
  FilePlus2,
  FileSymlink,
  Files,
} from "lucide-react";

const statusConfig = {
  added: {
    label: "Added",
    icon: FilePlus2,
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  removed: {
    label: "Deleted",
    icon: FileMinus2,
    className: "border-red-200 bg-red-50 text-red-700",
  },
  deleted: {
    label: "Deleted",
    icon: FileMinus2,
    className: "border-red-200 bg-red-50 text-red-700",
  },
  renamed: {
    label: "Renamed",
    icon: FileSymlink,
    className: "border-violet-200 bg-violet-50 text-violet-700",
  },
  modified: {
    label: "Modified",
    icon: FileDiff,
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
};

const getStatusConfig = (status) => {
  const normalizedStatus = status?.toLowerCase();
  return (
    statusConfig[normalizedStatus] || {
      label: status || "Changed",
      icon: FileCode2,
      className: "border-slate-200 bg-slate-50 text-slate-700",
    }
  );
};

const ChangedFilesCard = ({ files = [] }) => {
  const totalAdditions = files.reduce(
    (total, file) => total + (Number(file.additions) || 0),
    0,
  );
  const totalDeletions = files.reduce(
    (total, file) => total + (Number(file.deletions) || 0),
    0,
  );

  return (
    <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50/80 px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-950">
              Changed Files
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              GitHub-style summary of files touched by this pull request.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700">
              <Files className="h-3.5 w-3.5" aria-hidden="true" />
              {files.length} files
            </span>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
              +{totalAdditions}
            </span>
            <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 font-semibold text-red-700">
              -{totalDeletions}
            </span>
          </div>
        </div>
      </div>

      {files.length === 0 ? (
        <div className="p-6 text-sm text-slate-500">
          No changed files found.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {files.map((file, index) => {
            const config = getStatusConfig(file.status);
            const StatusIcon = config.icon;

            return (
              <article
                key={`${file.filename}-${index}`}
                className="group grid gap-4 px-5 py-4 transition hover:bg-slate-50 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-6"
              >
                <div className="min-w-0">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="mt-0.5 rounded-md border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition group-hover:text-slate-700">
                      <FileCode2 className="h-4 w-4" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <p className="break-all font-mono text-sm font-semibold text-slate-800">
                        {file.filename}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${config.className}`}
                        >
                          <StatusIcon
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          {config.label}
                        </span>

                        <span className="text-xs text-slate-500">
                          {file.changes} total changes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:justify-end">
                  <span className="min-w-16 rounded-md bg-emerald-50 px-2.5 py-1 text-right text-sm font-semibold text-emerald-700">
                    +{file.additions}
                  </span>

                  <span className="min-w-16 rounded-md bg-red-50 px-2.5 py-1 text-right text-sm font-semibold text-red-700">
                    -{file.deletions}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ChangedFilesCard;
