import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import RepositoryLayout from "../layouts/RepositoryLayout";
import RepositoryHero from "../components/repository/RepositoryHero";

export default function RepositoryWorkspace() {
  const { id } = useParams();

  const [repository, setRepository] = useState(null);

  useEffect(() => {
    fetchRepository();
  }, [id]);

  const fetchRepository = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/repositories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRepository(response.data.repository);
    } catch (error) {
      console.error(error);
    }
  };

  if (!repository) {
    return (
      <RepositoryLayout repository={null}>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          Loading repository...
        </div>
      </RepositoryLayout>
    );
  }

  return (
    <RepositoryLayout repository={repository}>
      <RepositoryHero repository={repository} />

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="text-2xl font-semibold text-white">
          Repository Overview
        </h2>

        <p className="mt-3 text-slate-400">
          Repository overview dashboard will be implemented in the next commit.
        </p>
      </div>
    </RepositoryLayout>
  );
}