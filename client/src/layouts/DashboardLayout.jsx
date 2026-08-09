import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0F19]">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <div
        className={`
        w-[min(18rem,calc(100vw-1rem))]
        fixed inset-y-0 left-0 z-50 lg:static lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar with Mobile Menu Button */}
        <div className="sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white sm:left-4 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <Topbar />
        </div>

        {/* Scrollable Main Content */}
        <main className="min-w-0 flex-1 overflow-y-auto bg-[#0B0F19] p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full min-w-0 max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
