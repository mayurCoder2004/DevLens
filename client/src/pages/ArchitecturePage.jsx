import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";

import RepositoryArchitecture from "../components/repository/architecture/RepositoryArchitecture";
import ArchitectureSkeleton from "../components/repository/architecture/ArchitectureSkeleton";

export default function ArchitecturePage() {
  const { repository } = useOutletContext();
  const { repositoryId } = useParams();

  const [architecture, setArchitecture] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [insights, setInsights] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArchitecture();
  }, [repositoryId]);

  const fetchArchitecture = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/repositories/${repositoryId}/architecture`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Architecture Response:", response.data);

      setArchitecture(response.data.architecture);
      setAnalytics(response.data.analytics);
      setInsights(response.data.insights);
      setRecommendations(response.data.recommendations || []);
    } catch (error) {
      console.error("Error fetching architecture:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ArchitectureSkeleton />;
  }

  return (
    <RepositoryArchitecture
      repository={repository}
      architecture={architecture}
      analytics={analytics}
      insights={insights}
      recommendations={recommendations}
    />
  );
}