import { useEffect, useState, useCallback } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getRepositoryPullRequests } from "../services/pullRequest";
import PullRequestList from "../components/repository/pullRequest/PullRequestList";
import PullRequestListSkeleton from "../components/repository/pullRequest/PullRequestListSkeleton";
import RepositoryPageHeader from "../components/repository/shared/RepositoryPageHeader";

export default function PullRequestsPage() {
  const { refreshRepository } = useOutletContext();
  const { repositoryId } = useParams();

  const [pullRequests, setPullRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPullRequests = useCallback(async ({
    silent = false,
    rethrow = false,
  } = {}) => {
    try {
      if (!silent) {
        setLoading(true);
      }

      const response = await getRepositoryPullRequests(repositoryId);

      setPullRequests(response.data.data);
    } catch (err) {
      console.error(err);
      if (!rethrow) {
        toast.error(
          err.response?.data?.message ?? "Failed to load pull requests."
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
  }, [repositoryId]);

  useEffect(() => {
    Promise.resolve().then(() => loadPullRequests());
  }, [loadPullRequests]);

  const handleRefresh = async () => {
    setRefreshing(true);

    await toast.promise(
      (async () => {
        await loadPullRequests({ silent: true, rethrow: true });
        await refreshRepository();
      })(),
      {
        loading: "Refreshing pull requests...",
        success: "Pull requests refreshed successfully!",
        error: (err) =>
          err.response?.data?.message ?? "Failed to refresh pull requests.",
      }
    )
      .catch(() => {})
      .finally(() => setRefreshing(false));
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <PullRequestListSkeleton />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <RepositoryPageHeader
        title="Pull Requests"
        description="Review, analyze, and assess engineering risk across all pull requests in this repository."
        actionLabel="Refresh Pull Requests"
        action={handleRefresh}
        loading={refreshing}
      />

      <PullRequestList
        repositoryId={repositoryId}
        pullRequests={pullRequests}
      />
    </div>
  );
}
