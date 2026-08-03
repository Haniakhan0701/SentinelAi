import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-full border border-line bg-panel2 px-3 py-1.5 text-xs text-muted hover:text-text transition-colors"
      title="Toggle dark / light mode"
    >
      {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
