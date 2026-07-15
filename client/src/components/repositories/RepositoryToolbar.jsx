import {
  Search,
  ArrowUpDown,
  Filter,
} from "lucide-react";

export default function RepositoryToolbar({
  totalRepositories = 0,
}) {
  return (
    <section className="mb-8">
      {/* Header */}

      <div className="mb-6 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Repositories
          </h1>

          <p className="mt-2 text-slate-400">
            Browse, search and launch engineering workspaces.
          </p>
        </div>

        <span className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400">
          {totalRepositories} repositories
        </span>
      </div>

      {/* Toolbar */}

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}

        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search repositories..."
            className="
              w-full
              rounded-xl
              border
              border-slate-800
              bg-slate-950
              py-3
              pl-11
              pr-4
              text-sm
              text-white
              placeholder:text-slate-500
              focus:border-blue-500/40
              focus:outline-none
            "
          />
        </div>

        {/* Controls */}

        <div className="flex flex-wrap gap-3">
          <button
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-800
              bg-slate-950
              px-4
              py-3
              text-sm
              text-slate-300
              transition
              hover:border-slate-700
            "
          >
            <Filter size={16} />
            All
          </button>

          <button
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-800
              bg-slate-950
              px-4
              py-3
              text-sm
              text-slate-300
              transition
              hover:border-slate-700
            "
          >
            <ArrowUpDown size={16} />
            Sort
          </button>
        </div>
      </div>
    </section>
  );
}