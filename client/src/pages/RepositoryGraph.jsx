import { useState } from "react";
import PublicRepositoryGraph from "../components/repository/architecture/PublicRepositoryGraph";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const RepositoryGraph = () => {
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeRepository = async (event) => {
    event.preventDefault();

    if (!repositoryUrl.trim()) {
      setError("Please enter a GitHub repository URL.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/repository-graph/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            repositoryUrl: repositoryUrl.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to analyze repository.",
        );
      }

      setAnalysis(data);
    } catch (requestError) {
      setError(
        requestError.message ||
          "Something went wrong while analyzing the repository.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            DevLens
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Repository Graph
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Explore the structure and dependencies of any public
            GitHub repository.
          </p>
        </div>

        <form
          onSubmit={analyzeRepository}
          className="mx-auto max-w-3xl"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="url"
              value={repositoryUrl}
              onChange={(event) =>
                setRepositoryUrl(event.target.value)
              }
              placeholder="https://github.com/owner/repository"
              className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-cyan-500 px-7 py-4 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
            {error}
          </div>
        )}

        {analysis && (
          <div className="mt-12">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <p className="text-sm text-slate-500">
                    Repository
                  </p>

                  <h2 className="mt-1 text-2xl font-semibold">
                    {analysis.repository.fullName}
                  </h2>

                  {analysis.repository.description && (
                    <p className="mt-2 max-w-3xl text-slate-400">
                      {analysis.repository.description}
                    </p>
                  )}
                </div>

                <a
                  href={analysis.repository.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
                >
                  View on GitHub ?
                </a>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-sm text-slate-500">
                    Repository Files
                  </p>
                  <p className="mt-2 text-2xl font-bold">
                    {analysis.stats.totalFiles}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-sm text-slate-500">
                    Source Files
                  </p>
                  <p className="mt-2 text-2xl font-bold">
                    {analysis.stats.fetchedSourceFiles}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-sm text-slate-500">
                    Graph Nodes
                  </p>
                  <p className="mt-2 text-2xl font-bold">
                    {analysis.stats.graphNodes}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-sm text-slate-500">
                    Dependencies
                  </p>
                  <p className="mt-2 text-2xl font-bold">
                    {analysis.stats.graphEdges}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
              <div className="border-b border-slate-800 p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-white">
                  Repository Dependency Graph
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Explore how files in this repository depend on
                  each other.
                </p>
              </div>

              <div className="h-[600px] bg-slate-950">
                <PublicRepositoryGraph graph={analysis.graph} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepositoryGraph;
