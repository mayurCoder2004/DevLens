import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import RepositoryHero from "../components/repository/shared/RepositoryHero";
import RepositoryGrid from "../components/dashboard/RepositoryGrid";
import RepositoryToolbar from "../components/dashboard/RepositoryToolbar";
import { getRepositories } from "../api/repository.api";

export default function Repositories() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      setLoading(true);

      const response = await getRepositories();

      setRepos(response.data.repositories);
    } catch (error) {
      console.error("Failed to fetch repositories:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const owners = ["all", ...new Set(repos.map((repo) => repo.owner))];

  const filteredRepositories = [...repos]
    .filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        ownerFilter === "all" ? true : repo.owner === ownerFilter;

      return matchesSearch && matchesVisibility && matchesOwner;
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

        default:
          return (
            new Date(b.updatedAtGithub || 0) - new Date(a.updatedAtGithub || 0)
          );
      }
    });

  return (
    <DashboardLayout>
      <RepositoryHero totalRepositories={repos.length} />

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

      <RepositoryGrid repos={filteredRepositories} loading={loading} />
    </DashboardLayout>
  );
}
