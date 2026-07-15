import { useEffect, useState } from "react";
import axios from "axios";

import AttentionPanel from "../components/dashboard/AttentionPanel";
import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardLayout from "../layouts/DashboardLayout";
import EngineeringOverview from "../components/dashboard/EngineeringOverview";
import WorkspaceActions from "../components/dashboard/WorkspaceActions";
import RecentActivity from "../components/dashboard/RecentActivity";

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
        }
      );

      setRepos(response.data.repositories);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardHero
        totalRepositories={repos.length}
        averageScore={84}
        recentAnalyses={repos.length}
      />

      <EngineeringOverview />

      <AttentionPanel />

      <WorkspaceActions />

      <RecentActivity />
    </DashboardLayout>
  );
};

export default Dashboard;