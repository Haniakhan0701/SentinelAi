import { ShieldHalf, Crosshair, ListTree, FileDown, Cpu, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { icon: Crosshair, label: "Live Attacks", path: "/" },
  { icon: ListTree, label: "Attack Library", path: "/attack-library" },
  { icon: Cpu, label: "Hardware Status", path: "/hardware" },
  { icon: FileDown, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" }
];

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-line bg-panel flex flex-col">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-line">
        <ShieldHalf className="text-signal" size={22} />
        <div>
          <div className="font-mono text-sm font-bold tracking-wide text-text">SentinelAI</div>
          <div className="text-[10px] text-muted tracking-widest">RED TEAM CONSOLE</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-panel2 text-text border border-line"
                  : "text-muted hover:text-text hover:bg-panel2/60 border border-transparent"
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-line text-[11px] text-muted font-mono">
        v0.2.0 · local build
      </div>
    </aside>
  );
}
