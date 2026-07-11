import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0B0F19]">
      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto bg-[#0B0F19] p-8">
          {children}
        </main>
      </div>
    </div>
  );
}