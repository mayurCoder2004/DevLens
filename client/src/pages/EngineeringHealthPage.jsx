import { useEffect, useState, useCallback } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Activity, BadgeCheck, BarChart3, Lightbulb } from "lucide-react";
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
  const [refreshing, setRefreshing] = useState(false);

  const loadEngineeringHealth = useCallback(
    async ({ silent = false, rethrow = false } = {}) => {
      try {
        if (!silent) {
          setLoading(true);
        }

        const response = await getEngineeringHealth(repositoryId);

        setEngineeringHealth(response.data.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setEngineeringHealth(null);
        } else if (!rethrow) {
          console.error("Failed to load engineering health:", err.message);
          toast.error(
            err.response?.data?.message ?? "Failed to load engineering health.",
          );
        }

        if (rethrow) {
          throw err;
        }
      } finally {
        if (!silent) {
          setLoading(false);
        }
      }
    },
    [repositoryId],
  );

  useEffect(() => {
    Promise.resolve().then(() => loadEngineeringHealth());
  }, [loadEngineeringHealth]);

  const handleRefresh = async () => {
    setRefreshing(true);

    await toast
      .promise(
        (async () => {
          await loadEngineeringHealth({ silent: true, rethrow: true });
          await refreshRepository();
        })(),
        {
          loading: "Re-analyzing engineering health...",
          success: "Engineering health re-analyzed successfully!",
          error: (err) =>
            err.response?.data?.message ??
            "Failed to refresh engineering health.",
        },
      )
      .catch(() => {})
      .finally(() => setRefreshing(false));
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
          actionLabel="Re-analyze Engineering Health"
          action={handleRefresh}
          loading={refreshing}
        />

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-10 text-center sm:px-10 sm:py-16">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
            <Activity className="h-8 w-8 text-blue-400" />
          </div>

          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            No Engineering Health Data
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Engineering health is computed from your workspace analyses. Run
            Architecture, Technical Debt, and Deployment analyses first to
            populate this dashboard.
          </p>

          <div className="mx-auto mt-8 grid max-w-xl gap-4 text-left sm:grid-cols-2">
            <EmptyFeature
              icon={Activity}
              iconColor="text-blue-400"
              title="Overall Score"
              description="Aggregated engineering health across all dimensions."
            />
            <EmptyFeature
              icon={BarChart3}
              iconColor="text-violet-400"
              title="Score Breakdown"
              description="Per-dimension scores for each workspace analysis."
            />
            <EmptyFeature
              icon={BadgeCheck}
              iconColor="text-emerald-400"
              title="AI Insights"
              description="Engineering strengths and priority improvement areas."
            />
            <EmptyFeature
              icon={Lightbulb}
              iconColor="text-amber-400"
              title="Recommendations"
              description="Actionable suggestions to improve engineering quality."
            />
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="mt-10 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {refreshing ? "Re-analyzing..." : "Re-analyze Engineering Health"}
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
        actionLabel="Re-analyze Engineering Health"
        action={handleRefresh}
        loading={refreshing}
      />

      <RepositoryEngineeringHealth
        repository={repository}
        engineeringHealth={engineeringHealth}
      />
    </div>
  );
}

function EmptyFeature({ icon: Icon, iconColor, title, description }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="mb-2 flex items-center gap-2 text-white">
        <Icon className={`h-4 w-4 ${iconColor}`} />
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}
