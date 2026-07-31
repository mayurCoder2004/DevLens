import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getRepositoryPullRequests } from "../services/pullRequest";
import PullRequestList from "../components/repository/pullRequest/PullRequestList";
import PullRequestListSkeleton from "../components/repository/pullRequest/PullRequestListSkeleton";

export default function PullRequestsPage() {
  const { repositoryId } = useParams();

  const [pullRequests, setPullRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPullRequests();
  }, [repositoryId]);

  const fetchPullRequests = async () => {
    try {
      const response =
        await getRepositoryPullRequests(repositoryId);

      setPullRequests(response.data.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ??
          "Failed to load pull requests."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PullRequestListSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-900 bg-red-950/30 p-6 text-red-300">
        {error}
      </div>
    );
  }

  return (
    <PullRequestList
      repositoryId={repositoryId}
      pullRequests={pullRequests}
    />
  );
}