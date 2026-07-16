import Topbar from "../components/layouts/Topbar";
import RepositorySidebar from "../components/repository/RepositorySidebar";

export default function RepositoryLayout({
  repository,
  activeSection,
  onSectionChange,
  children,
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0F19]">
      {/* Repository Sidebar */}

      <RepositorySidebar
        repository={repository}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />

      {/* Main Content */}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}

        <Topbar />

        {/* Workspace */}

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1700px] p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}