import {
  FileCode,
  Trash2,
  Network,
  ChevronRight,
} from "lucide-react";

export default function TechnicalDebtFileBreakdown({ technicalDebt }) {
  if (!technicalDebt) return null;

  const {
    largeFiles = [],
    deadFiles = [],
    deepDependencyChains = [],
  } = technicalDebt;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Technical Debt File Breakdown
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Detailed analysis of repository files contributing to technical debt.
        </p>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-3">
        {/* Large Files */}

        <div className="rounded-xl border border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3 border-b border-slate-800 p-5">
            <FileCode className="h-5 w-5 text-amber-400" />

            <h3 className="font-semibold text-white">
              Large Files ({largeFiles.length})
            </h3>
          </div>

          <div className="divide-y divide-slate-800">
            {largeFiles.length === 0 ? (
              <p className="p-5 text-sm text-slate-500">
                No oversized files detected.
              </p>
            ) : (
              largeFiles.map((file) => (
                <div
                  key={file.file}
                  className="flex items-center justify-between p-5"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {file.file}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {file.lines} LOC
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dead Files */}

        <div className="rounded-xl border border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3 border-b border-slate-800 p-5">
            <Trash2 className="h-5 w-5 text-rose-400" />

            <h3 className="font-semibold text-white">
              Dead Files ({deadFiles.length})
            </h3>
          </div>

          <div className="divide-y divide-slate-800">
            {deadFiles.length === 0 ? (
              <p className="p-5 text-sm text-slate-500">
                No dead files detected.
              </p>
            ) : (
              deadFiles.map((file) => (
                <div
                  key={file}
                  className="flex items-center gap-3 p-5"
                >
                  <ChevronRight className="h-4 w-4 text-slate-500" />

                  <p className="text-sm text-white">
                    {file}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dependency Chains */}

        <div className="rounded-xl border border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3 border-b border-slate-800 p-5">
            <Network className="h-5 w-5 text-cyan-400" />

            <h3 className="font-semibold text-white">
              Dependency Chains
            </h3>
          </div>

          <div className="space-y-6 p-5">
            {deepDependencyChains.length === 0 ? (
              <p className="text-sm text-slate-500">
                No deep dependency chains detected.
              </p>
            ) : (
              deepDependencyChains.map((chain, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-800 bg-slate-900 p-4"
                >
                  <div className="space-y-2">
                    {chain.chain.map((node, idx) => (
                      <div key={idx}>
                        <p className="text-sm text-white">
                          {node}
                        </p>

                        {idx < chain.chain.length - 1 && (
                          <div className="ml-2 my-1 h-4 w-px bg-slate-700" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-slate-800 pt-3">
                    <span className="text-xs text-slate-400">
                      Depth:{" "}
                      <span className="font-medium text-white">
                        {chain.depth}
                      </span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}