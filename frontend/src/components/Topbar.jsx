import ThemeToggle from "./ThemeToggle.jsx";

export default function TopBar({ title, subtitle, right }) {
  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-line">
      <div>
        <h1 className="text-lg font-semibold text-text">{title}</h1>
        {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {right}
        <ThemeToggle />
      </div>
    </header>
  );
}
