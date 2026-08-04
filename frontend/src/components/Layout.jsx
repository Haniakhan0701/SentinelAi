import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar.jsx";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar — always visible on lg+ screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar — slides in as an overlay, only rendered when open */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative h-full">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top strip with hamburger — only shows below lg */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-line lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-md border border-line text-muted hover:text-text"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <span className="font-mono text-sm font-bold text-text">SentinelAI</span>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
