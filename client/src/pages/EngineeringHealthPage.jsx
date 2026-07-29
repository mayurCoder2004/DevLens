import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import { getEngineeringHealth } from "../services/engineeringHealth";
import RepositoryEngineeringHealth from "../components/repository/workspace/RepositoryEngineeringHealth";

export default function EngineeringHealthPage() {
  const { repository } = useOutletContext();
  const { repositoryId } = useParams();

  const [engineeringHealth, setEngineeringHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEngineeringHealth();
  }, [repositoryId]);

  const fetchEngineeringHealth = async () => {
    try {
      const response = await getEngineeringHealth(repositoryId);

      setEngineeringHealth(response.data.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ??
          "Failed to load engineering health."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
        Loading engineering health...
      </div>
    );
  }

  if (!engineeringHealth) {
    return (
      <div className="rounded-2xl border border-red-900 bg-red-950/30 p-6 text-red-300">
        {error || "Engineering health report not found."}
      </div>
    );
  }

  return (
    <RepositoryEngineeringHealth
      repository={repository}
      engineeringHealth={engineeringHealth}
    />
  );
}