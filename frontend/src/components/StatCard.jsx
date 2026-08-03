import TiltCard from "./TiltCard.jsx";

export default function StatCard({ label, value, sub, tone = "text" }) {
  const toneClass = {
    text: "text-text",
    signal: "text-signal",
    alert: "text-alert",
    watch: "text-watch",
    wire: "text-wire"
  }[tone];

  return (
    <TiltCard className="rounded-lg border border-line bg-panel">
      <div className="px-5 py-4">
        <div className="text-[11px] uppercase tracking-widest text-muted">{label}</div>
        <div className={`mt-2 text-3xl font-mono font-bold ${toneClass}`}>{value}</div>
        {sub && <div className="mt-1 text-xs text-muted">{sub}</div>}
      </div>
    </TiltCard>
  );
}
