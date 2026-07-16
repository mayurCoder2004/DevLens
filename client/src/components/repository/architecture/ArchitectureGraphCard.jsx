import { Network } from "lucide-react";
import DependencyGraph from "./DependencyGraph";

export default function ArchitectureGraphCard({ architecture }) {
  if (!architecture) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900">
      {/* Header Section */}
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2">
            <Network size={22} className="text-blue-400" />
          </div>

          <div>
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
      <div className="border-b border-slate-800 bg-slate-900/50 px-6 py-3">
        <h3 className="text-sm font-medium text-slate-300">
          Interactive Dependency Graph
        </h3>
      </div>

      {/* Graph Container */}
      <div className="h-[600px] overflow-hidden rounded-b-2xl bg-slate-950">
        <DependencyGraph architecture={architecture} />
      </div>
    </section>
  );
}