import { useEffect, useState, useCallback } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getEngineeringHealth } from "../services/engineeringHealth";
import RepositoryEngineeringHealth from "../components/repository/workspace/RepositoryEngineeringHealth";
import EngineeringHealthSkeleton from "../components/repository/engineeringHealth/EngineeringHealthSkeleton";
import RepositoryPageHeader from "../components/repository/shared/RepositoryPageHeader";

export default function EngineeringHealthPage() {
  const { repository, refreshRepository } = useOutletContext();
  const { repositoryId } = useParams();

  const [engineeringHealth, setEngineeringHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadEngineeringHealth = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getEngineeringHealth(repositoryId);

      setEngineeringHealth(response.data.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setEngineeringHealth(null);
      } else {
        console.error(err);
        toast.error(
          err.response?.data?.message ?? "Failed to load engineering health."
        );
      }
    } finally {
      setLoading(false);
    }
  }, [repositoryId]);

  useEffect(() => {
    loadEngineeringHealth();
  }, [loadEngineeringHealth]);

  const handleRefresh = async () => {
    toast.promise(
      (async () => {
        await loadEngineeringHealth();
        await refreshRepository();
      })(),
      {
        loading: "Refreshing engineering health...",
        success: "Engineering health refreshed successfully!",
        error: (err) =>
          err.response?.data?.message ?? "Failed to refresh engineering health.",
      }
    );
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <EngineeringHealthSkeleton />
      </div>
    );
  }

  if (!engineeringHealth) {
    return (
      <div className="mx-auto max-w-7xl space-y-8">
        <RepositoryPageHeader
          title="Engineering Health"
          description="Consolidated view of repository health across architecture, technical debt, deployment, and pull request quality."
          actionLabel="Refresh"
          action={handleRefresh}
          loading={loading}
        />

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 px-10 py-16 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-4xl">
            🏥
          </div>

          <h2 className="text-2xl font-semibold text-white">
            No Engineering Health Data
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Engineering health is computed from your workspace analyses. Run
            Architecture, Technical Debt, and Deployment analyses first to
            populate this dashboard.
          </p>

          <div className="mx-auto mt-8 grid max-w-xl gap-4 text-left sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">✓ Overall Score</h4>
              <p className="mt-1 text-sm text-slate-400">
                Aggregated engineering health across all dimensions.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">✓ Score Breakdown</h4>
              <p className="mt-1 text-sm text-slate-400">
                Per-dimension scores for each workspace analysis.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">✓ AI Insights</h4>
              <p className="mt-1 text-sm text-slate-400">
                Engineering strengths and priority improvement areas.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">✓ Recommendations</h4>
              <p className="mt-1 text-sm text-slate-400">
                Actionable suggestions to improve engineering quality.
              </p>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            className="mt-10 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
          >
            Refresh Engineering Health
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <RepositoryPageHeader
        title="Engineering Health"
        description="Consolidated view of repository health across architecture, technical debt, deployment, and pull request quality."
        actionLabel="Refresh"
        action={handleRefresh}
        loading={loading}
      />

      <RepositoryEngineeringHealth
        repository={repository}
        engineeringHealth={engineeringHealth}
      />
    </div>
  );
}
