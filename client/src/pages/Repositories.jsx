import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../layouts/DashboardLayout";
import RepositoryGrid from "../components/dashboard/RepositoryGrid";

export default function Repositories() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
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
      {/* Page Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Repositories
        </h1>

        <p className="mt-2 text-slate-400">
          Browse, search, and launch engineering workspaces for all your
          repositories.
        </p>
      </div>

      {/* Repository Grid */}

      <RepositoryGrid repos={repos} />
    </DashboardLayout>
  );
}