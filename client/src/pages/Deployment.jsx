import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import {
  getDeploymentReport,
  analyzeDeployment,
} from "../services/deployment";
import RepositoryDeployment from "../components/repository/workspace/RepositoryDeployment";
import DeploymentSkeleton from "../components/repository/deployment/DeploymentSkeleton";

export default function Deployment() {
  const { repository } = useOutletContext();
  const { repositoryId } = useParams();

  const [deployment, setDeployment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDeployment();
  }, [repositoryId]);

  const fetchReport = async () => {
    const response = await getDeploymentReport(repositoryId);
    setDeployment(response.data.data);
  };

  const analyzeAndFetch = async () => {
    setAnalyzing(true);

    try {
      await analyzeDeployment(repositoryId);
      await fetchReport();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ??
          "Deployment analysis failed."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const loadDeployment = async () => {
    setLoading(true);

    try {
      await fetchReport();
    } catch (err) {
      if (err.response?.status === 404) {
        await analyzeAndFetch();
      } else {
        console.error(err);

        setError(
          err.response?.data?.message ??
            "Failed to load deployment report."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <DeploymentSkeleton />;
  }

  if (!deployment) {
    return (
      <div className="rounded-2xl border border-red-900 bg-red-950/30 p-6 text-red-300">
        {error || "Deployment report not available."}
      </div>
    );
  }

  return (
    <RepositoryDeployment
      repository={repository}
      deployment={deployment}
      analyzing={analyzing}
      error={error}
      onReanalyze={analyzeAndFetch}
    />
  );
}