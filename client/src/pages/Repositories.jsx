import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../layouts/DashboardLayout";
import RepositoryGrid from "../components/dashboard/RepositoryGrid";
import RepositoryToolbar from "../components/repositories/RepositoryToolbar";

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
      <RepositoryToolbar
        totalRepositories={repos.length}
      />

      <RepositoryGrid repos={repos} />
    </DashboardLayout>
  );
}