import { FileCode, Trash2, Network, ChevronRight } from "lucide-react";

export default function TechnicalDebtFileBreakdown({ technicalDebt }) {
  if (!technicalDebt) return null;

  const {
    largeFiles = [],
    deadFiles = [],
    deepDependencyChains = [],
  } = technicalDebt;

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Technical Debt File Breakdown
        </h2>

        <p className="mt-2 text-slate-400">
          Detailed file-level analysis of technical debt contributors.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Large Files */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3 border-b border-slate-800 p-4 sm:p-6">
            <div className="rounded-lg bg-amber-500/10 p-2">
              <FileCode className="h-5 w-5 text-amber-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">Large Files</h3>
              <p className="text-sm text-slate-500">
                {largeFiles.length} files
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-800">
            {largeFiles.length === 0 ? (
              <div className="p-6 text-center">
                <FileCode className="mx-auto h-10 w-10 text-slate-700" />
                <p className="mt-3 text-sm text-slate-500">
                  No oversized files detected
                </p>
              </div>
            ) : (
              largeFiles.map((file) => (
                <div
                  key={file.file}
                  className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-slate-800/50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="break-all text-sm font-medium text-white">
                      {file.file}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {file.lines.toLocaleString()} lines
                    </p>
                  </div>

                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-600" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dead Files */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3 border-b border-slate-800 p-4 sm:p-6">
            <div className="rounded-lg bg-rose-500/10 p-2">
              <Trash2 className="h-5 w-5 text-rose-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">Dead Files</h3>
              <p className="text-sm text-slate-500">{deadFiles.length} files</p>
            </div>
          </div>

          <div className="divide-y divide-slate-800">
            {deadFiles.length === 0 ? (
              <div className="p-6 text-center">
                <Trash2 className="mx-auto h-10 w-10 text-slate-700" />
                <p className="mt-3 text-sm text-slate-500">
                  No dead files detected
                </p>
              </div>
            ) : (
              deadFiles.map((file) => (
                <div
                  key={file}
                  className="flex items-center gap-3 p-5 transition-colors hover:bg-slate-800/50"
                >
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-600" />

                  <p className="min-w-0 flex-1 break-all text-sm text-slate-300">
                    {file}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dependency Chains */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3 border-b border-slate-800 p-4 sm:p-6">
            <div className="rounded-lg bg-cyan-500/10 p-2">
              <Network className="h-5 w-5 text-cyan-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">Dependency Chains</h3>
              <p className="text-sm text-slate-500">
                {deepDependencyChains.length} chains
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {deepDependencyChains.length === 0 ? (
              <div className="text-center">
                <Network className="mx-auto h-10 w-10 text-slate-700" />
                <p className="mt-3 text-sm text-slate-500">
                  No deep dependency chains detected
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {deepDependencyChains.map((chain, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                  >
                    <div className="space-y-2">
                      {chain.chain.map((node, idx) => (
                        <div key={idx}>
                          <p className="break-all text-sm text-slate-300">
                            {node}
                          </p>

                          {idx < chain.chain.length - 1 && (
                            <div className="my-1 ml-2 h-3 w-px bg-slate-700" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
                      <span className="text-xs text-slate-500">
                        Chain Depth
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {chain.depth}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
