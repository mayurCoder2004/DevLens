import {
  Search,
  ArrowUpDown,
  Filter,
  Users,
  RotateCcw,
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
  const activeFilters =
    (searchQuery ? 1 : 0) +
    (visibilityFilter !== "all" ? 1 : 0) +
    (ownerFilter !== "all" ? 1 : 0);

  const clearFilters = () => {
    onSearchChange("");
    onVisibilityChange("all");
    onOwnerChange("all");
    onSortChange("updated");
  };

  return (
    <section className="mb-10">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Repository Library
          </h1>

          <p className="mt-2 max-w-2xl text-slate-400">
            Browse, filter, organize and launch engineering
            workspaces for your GitHub repositories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeFilters > 0 && (
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
              {activeFilters} Active Filter
              {activeFilters > 1 ? "s" : ""}
            </span>
          )}

          <span className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400">
            {totalRepositories} Repositories
          </span>
        </div>
      </div>

      {/* Toolbar */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
          {/* Search */}

          <div className="relative flex-1 xl:max-w-md">
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
                transition
                focus:border-blue-500/40
                focus:outline-none
              "
            />
          </div>

          {/* Controls */}

          <div className="flex flex-wrap gap-3">
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
                <option value="all">All Visibility</option>
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
                  <option
                    key={owner}
                    value={owner}
                  >
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

            {/* Clear Filters */}

            {activeFilters > 0 && (
              <button
                onClick={clearFilters}
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
                  hover:border-red-500/30
                  hover:text-red-400
                "
              >
                <RotateCcw size={16} />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}