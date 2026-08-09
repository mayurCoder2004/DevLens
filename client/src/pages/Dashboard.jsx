import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import AttentionPanel from "../components/dashboard/AttentionPanel";
import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardLayout from "../layouts/DashboardLayout";
import EngineeringOverview from "../components/dashboard/EngineeringOverview";
import WorkspaceActions from "../components/dashboard/WorkspaceActions";
import RecentActivity from "../components/dashboard/RecentActivity";

import { getRecentActivities } from "../api/activity.api";
import {
  getDashboardOverview,
  getRepositoriesNeedingAttention,
} from "../api/dashboard.api";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [repos, setRepos] = useState([]);
  const [syncLoading, setSyncLoading] = useState(false);

  const [activities, setActivities] = useState([]);
  const [activityLoading, setActivityLoading] =
    useState(true);

  const [overview, setOverview] = useState(null);
  const [overviewLoading, setOverviewLoading] =
    useState(true);

  const [attentionRepositories, setAttentionRepositories] =
    useState([]);

  const [attentionLoading, setAttentionLoading] =
    useState(true);

  useEffect(() => {
    fetchRepos();
    fetchActivities();
    fetchDashboardOverview();
    fetchAttentionRepositories();
  }, []);

  const fetchRepos = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/repositories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRepos(response.data.repositories);
    } catch (error) {
      console.error("Failed to fetch repositories:", error.message);
    }
  };

  const fetchActivities = async () => {
    try {
      setActivityLoading(true);

      const response = await getRecentActivities();

      setActivities(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch activities:",
        error.message
      );
    } finally {
      setActivityLoading(false);
    }
  };

  const fetchDashboardOverview = async () => {
    try {
      setOverviewLoading(true);

      const response =
        await getDashboardOverview();

      setOverview(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch dashboard overview:",
        error.message
      );
    } finally {
      setOverviewLoading(false);
    }
  };

  const fetchAttentionRepositories =
    async () => {
      try {
        setAttentionLoading(true);

        const response =
          await getRepositoriesNeedingAttention();

        setAttentionRepositories(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch attention repositories:",
          error.message
        );
      } finally {
        setAttentionLoading(false);
      }
    };

  const handleSync = async () => {
    const syncPromise = async () => {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/repositories/sync`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await Promise.all([
        fetchRepos(),
        fetchActivities(),
        fetchDashboardOverview(),
        fetchAttentionRepositories(),
      ]);
    };

    setSyncLoading(true);

    toast.promise(
      syncPromise(),
      {
        loading: 'Synchronizing GitHub repositories...',
        success: 'Repositories synchronized successfully!',
        error: 'Failed to synchronize GitHub repositories.',
      }
    ).finally(() => {
      setSyncLoading(false);
    });
  };

  return (
    <DashboardLayout>
      <DashboardHero
        totalRepositories={repos.length}
        averageScore={
          overview?.engineeringHealth?.score ?? 0
        }
        recentAnalyses={
          overview?.analyzedRepositories ?? 0
        }
        onSync={handleSync}
        syncLoading={syncLoading}
      />

      <EngineeringOverview
        overview={overview}
        loading={overviewLoading}
      />

      <AttentionPanel
        repositories={attentionRepositories}
        loading={attentionLoading}
      />

      <WorkspaceActions />

      <RecentActivity
        activities={activities}
        loading={activityLoading}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
