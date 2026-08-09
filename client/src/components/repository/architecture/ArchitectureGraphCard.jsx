import { Network } from "lucide-react";
import DependencyGraph from "./DependencyGraph";

export default function ArchitectureGraphCard({ architecture }) {
  if (!architecture) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900">
      {/* Header Section */}
      <div className="border-b border-slate-800 p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2">
            <Network size={22} className="text-blue-400" />
          </div>

          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-white">
              Dependency Graph
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Visualize relationships between files, folders and modules
            </p>
          </div>
        </div>
      </div>

      {/* Graph Title */}
      <div className="border-b border-slate-800 bg-slate-900/50 px-4 py-3 sm:px-6">
        <h3 className="text-sm font-medium text-slate-300">
          Interactive Dependency Graph
        </h3>
      </div>

      {/* Graph Container */}
      <div className="h-[420px] min-w-0 overflow-hidden rounded-b-2xl bg-slate-950 sm:h-[520px] lg:h-[600px]">
        <DependencyGraph architecture={architecture} />
      </div>
    </section>
  );
}
