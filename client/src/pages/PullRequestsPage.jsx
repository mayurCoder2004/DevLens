import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getRepositoryPullRequests } from "../services/pullRequest";
import PullRequestList from "../components/repository/pullRequest/PullRequestList";

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
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
        Loading pull requests...
      </div>
    );
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