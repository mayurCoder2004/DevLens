import { useOutletContext } from "react-router-dom";

import RepositoryHero from "../components/repository/shared/RepositoryHero";
import RepositoryOverview from "../components/repository/overview/RepositoryOverview";

export default function RepositoryWorkspace() {
  const { repository } = useOutletContext();

  if (!repository) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
        Loading repository...
      </div>
    );
  }

  return (
    <>
      <RepositoryHero repository={repository} />

      <div className="mt-8">
        <RepositoryOverview />
      </div>
    </>
  );
}
