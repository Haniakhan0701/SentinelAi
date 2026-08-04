import ThemeToggle from "./ThemeToggle.jsx";

export default function TopBar({ title, subtitle, right }) {
  return (
    <header className="flex flex-col gap-3 px-5 sm:px-8 py-4 sm:py-5 border-b border-line sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-base sm:text-lg font-semibold text-text truncate">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm text-muted mt-0.5 break-words">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        {right}
        <ThemeToggle />
      </div>
    </header>
  );
}
