export default function LiveAttackFeed({ entries }) {
  return (
    <div className="rounded-lg border border-line bg-panel">
      <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-line">
        <div className="text-[11px] uppercase tracking-widest text-muted">Live Attack Feed</div>
        <span className="h-2 w-2 rounded-full bg-signal pulse-dot" />
      </div>
      <div className="max-h-80 overflow-y-auto overflow-x-auto font-mono text-xs">
        {entries.map((e) => (
          <div
            key={e.id}
            className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-2.5 border-b border-line/60 last:border-0 min-w-max sm:min-w-0"
          >
            <span className="text-muted w-16 sm:w-20 shrink-0">{e.time}</span>
            <span className="text-wire w-12 sm:w-14 shrink-0">{e.id}</span>
            <span className="text-text w-32 sm:flex-1 sm:w-auto truncate">{e.type}</span>
            <span className="text-muted w-10 shrink-0">{Math.round(e.confidence * 100)}%</span>
            <span
              className={`w-14 sm:w-16 shrink-0 text-right font-bold ${
                e.verdict === "SAFE" ? "text-signal" : "text-alert"
              }`}
            >
              {e.verdict}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
