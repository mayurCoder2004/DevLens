import {
  Search,
  ArrowUpDown,
  Filter,
  Users,
} from "lucide-react";

export default function RepositoryToolbar({
  totalRepositories,
  searchQuery,
  onSearchChange,
  visibilityFilter,
  onVisibilityChange,
  ownerFilter,
  onOwnerChange,
  owners,
  sortBy,
  onSortChange,
}) {
  return (
    <section className="mb-8">
      {/* Header */}

      <div className="mb-6 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Repository Library
          </h1>

          <p className="mt-2 text-slate-400">
            Browse, filter and launch engineering workspaces.
          </p>
        </div>

        <span className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400">
          {totalRepositories} repositories
        </span>
      </div>

      {/* Toolbar */}

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:flex-row lg:flex-wrap lg:items-center">
        {/* Search */}

        <div className="relative w-full lg:max-w-sm">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
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

        {/* Visibility */}

        <div className="relative">
          <Filter
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <select
            value={visibilityFilter}
            onChange={(e) =>
              onVisibilityChange(e.target.value)
            }
            className="
              appearance-none
              rounded-xl
              border
              border-slate-800
              bg-slate-950
              py-3
              pl-10
              pr-8
              text-sm
              text-white
              focus:border-blue-500/40
              focus:outline-none
            "
          >
            <option value="all">All</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Owner */}

        <div className="relative">
          <Users
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <select
            value={ownerFilter}
            onChange={(e) =>
              onOwnerChange(e.target.value)
            }
            className="
              appearance-none
              rounded-xl
              border
              border-slate-800
              bg-slate-950
              py-3
              pl-10
              pr-8
              text-sm
              text-white
              focus:border-blue-500/40
              focus:outline-none
            "
          >
            {owners.map((owner) => (
              <option key={owner} value={owner}>
                {owner === "all"
                  ? "All Owners"
                  : owner}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}

        <div className="relative">
          <ArrowUpDown
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value)
            }
            className="
              appearance-none
              rounded-xl
              border
              border-slate-800
              bg-slate-950
              py-3
              pl-10
              pr-8
              text-sm
              text-white
              focus:border-blue-500/40
              focus:outline-none
            "
          >
            <option value="updated">
              Recently Updated
            </option>

            <option value="name-asc">
              Name (A-Z)
            </option>

            <option value="name-desc">
              Name (Z-A)
            </option>

            <option value="stars-desc">
              Stars (High-Low)
            </option>

            <option value="stars-asc">
              Stars (Low-High)
            </option>
          </select>
        </div>
      </div>
    </section>
  );
}