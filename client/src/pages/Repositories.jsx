import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../layouts/DashboardLayout";
import RepositoryGrid from "../components/dashboard/RepositoryGrid";
import RepositoryToolbar from "../components/dashboard/RepositoryToolbar";

export default function Repositories() {
  const [repos, setRepos] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");

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

  // Unique owners
  const owners = [
    "all",
    ...new Set(repos.map((repo) => repo.owner)),
  ];

  const filteredRepositories = [...repos]
    .filter((repo) => {
      const matchesSearch =
        repo.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (repo.description || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesVisibility =
        visibilityFilter === "all"
          ? true
          : visibilityFilter === "public"
          ? !repo.private
          : repo.private;

      const matchesOwner =
        ownerFilter === "all"
          ? true
          : repo.owner === ownerFilter;

      return (
        matchesSearch &&
        matchesVisibility &&
        matchesOwner
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);

        case "name-desc":
          return b.name.localeCompare(a.name);

        case "stars-desc":
          return (b.stars || 0) - (a.stars || 0);

        case "stars-asc":
          return (a.stars || 0) - (b.stars || 0);

        case "updated":
        default:
          return (
            new Date(b.updatedAt || 0) -
            new Date(a.updatedAt || 0)
          );
      }
    });

  return (
    <DashboardLayout>
      <RepositoryToolbar
        totalRepositories={filteredRepositories.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        visibilityFilter={visibilityFilter}
        onVisibilityChange={setVisibilityFilter}
        ownerFilter={ownerFilter}
        onOwnerChange={setOwnerFilter}
        owners={owners}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <RepositoryGrid repos={filteredRepositories} />
    </DashboardLayout>
  );
}