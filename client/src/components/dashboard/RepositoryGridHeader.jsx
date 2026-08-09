import { Search, SlidersHorizontal } from "lucide-react";

export default function RepositoryGridHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Repositories</h2>

        <p className="mt-2 text-sm text-slate-400">
          Browse and manage analyzed repositories.
        </p>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          />

          <input
            type="search"
            placeholder="Search repositories..."
            aria-label="Search repositories"
            className="
              h-10
              w-full
              rounded-xl
              border
              border-slate-800
              bg-slate-900
              pl-10
              pr-4
              text-sm
              text-white
              placeholder:text-slate-500
              transition-all
              duration-200
              focus:border-blue-500/50
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500/20
              sm:w-64
            "
          />
        </div>

        {/* Sort Button */}
        <button
          type="button"
          aria-label="Sort repositories"
          className="
            flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-800
            bg-slate-900
            px-4
            text-sm
            font-medium
            text-slate-300
            transition-all
            duration-200
            hover:border-blue-500/40
            hover:bg-slate-800
            hover:text-slate-200
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/40
            focus:ring-offset-2
            focus:ring-offset-slate-950
          "
        >
          <SlidersHorizontal size={16} aria-hidden="true" />
          Sort
        </button>
      </div>
    </div>
  );
}
