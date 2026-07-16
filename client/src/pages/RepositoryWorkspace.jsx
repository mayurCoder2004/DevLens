import RepositoryLayout from "../layouts/RepositoryLayout";

export default function RepositoryWorkspace() {
  return (
    <RepositoryLayout
      repositoryHero={
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h1 className="text-2xl font-bold text-white">
            Repository Hero
          </h1>

          <p className="mt-2 text-slate-400">
            Repository information will appear here.
          </p>
        </div>
      }
      repositoryNavigation={
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-white">
            Repository Navigation
          </p>
        </div>
      }
    >
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="text-xl font-semibold text-white">
          Repository Overview
        </h2>

        <p className="mt-2 text-slate-400">
          This is the repository workspace. The overview will be
          implemented in the next steps.
        </p>
      </div>
    </RepositoryLayout>
  );
}