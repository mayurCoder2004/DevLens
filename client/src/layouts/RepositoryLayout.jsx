import Sidebar from "../components/layouts/Sidebar";
import Topbar from "../components/layouts/Topbar";

export default function RepositoryLayout({
  repositoryHero,
  repositoryNavigation,
  children,
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0F19]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-[#0B0F19]">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
            {/* Repository Hero */}
            {repositoryHero}

            {/* Repository Navigation */}
            {repositoryNavigation}

            {/* Repository Page Content */}
            <div className="mt-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}