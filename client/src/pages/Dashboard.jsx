import { useEffect, useState } from "react";
import axios from "axios";

import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardLayout from "../layouts/DashboardLayout";
import EngineeringOverview from "../components/dashboard/EngineeringOverview";
import AttentionPanel from "../components/dashboard/AttentionPanel";
import RepositoryGrid from "../components/dashboard/RepositoryGrid";
import RecentActivity from "../components/dashboard/RecentActivity";
import WorkspaceActions from "../components/dashboard/WorkspaceActions";

const Dashboard = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/repositories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setRepos(response.data.repositories);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      {/* Hero Section */}

      <DashboardHero
        totalRepositories={repos.length}
        averageScore={84}
        recentAnalyses={repos.length}
      />

      <EngineeringOverview />

      <AttentionPanel />

      <RecentActivity />

      <WorkspaceActions />

      <RepositoryGrid repos={repos} />

    </DashboardLayout>
  );
};

export default Dashboard;