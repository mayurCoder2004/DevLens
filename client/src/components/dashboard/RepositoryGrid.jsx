import { FolderGit2 } from "lucide-react";
import RepositoryCard from "./RepositoryCard";
import RepositoryGridHeader from "./RepositoryGridHeader";

export default function RepositoryGrid({ repos = [] }) {
  return (
    <section className="mt-8">
      <RepositoryGridHeader />

      {repos.length === 0 ? (
        <div
          className="
            flex
            h-72
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-slate-800
            bg-slate-900
            text-center
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-slate-800/50
              text-slate-500
            "
          >
            <FolderGit2 size={24} aria-hidden="true" />
          </div>

          <h3 className="mt-4 text-xl font-semibold text-white">
            No repositories found
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-400">
            Sync your GitHub account to start analyzing repositories.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {repos.map((repo) => (
            <RepositoryCard
              key={repo.id}
              repositoryName={repo.name}
              description={repo.description}
              language={repo.language}
              stars={repo.stars}
              engineeringScore={84}
              lastAnalysis="2 hours ago"
              visibility={repo.isPrivate ? "Private" : "Public"}
              workspaceLink={`/repository/${repo.id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}