import Sidebar from "../components/layouts/Sidebar";
import Topbar from "../components/layouts/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0F19]">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Sticky Topbar */}
        <Topbar />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#0B0F19] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}