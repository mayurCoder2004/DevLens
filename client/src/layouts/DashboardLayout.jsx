import Sidebar from "../components/layouts/Sidebar";
import Topbar from "../components/layouts/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0B0F19]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto bg-[#0B0F19] p-4 sm:p-6 lg:p-8 pt-8 sm:pt-10 lg:pt-12">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}