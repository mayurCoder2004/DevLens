import React from "react";

export default function RepositoryGraph() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-400">
            DevLens Repository Graph
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Understand any public GitHub repository
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Explore repository structure, dependencies, technologies, and
            architecture from a single public GitHub URL.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <input
              type="url"
              placeholder="https://github.com/owner/repository"
              className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
            />

            <button
              type="button"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Analyze Repository
            </button>
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
          <div className="text-center">
            <div className="mb-4 text-4xl">?</div>

            <h2 className="text-xl font-semibold">
              Repository architecture will appear here
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Paste a public GitHub repository URL above to explore its
              dependency graph and architecture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
