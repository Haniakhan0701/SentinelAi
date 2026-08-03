import TiltCard from "./TiltCard.jsx";

export default function SafetyGauge({ score }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  const color = score >= 80 ? "#39FF88" : score >= 50 ? "#FFB020" : "#FF4757";
  const label = score >= 80 ? "LOW RISK" : score >= 50 ? "MODERATE RISK" : "HIGH RISK";

  return (
    <TiltCard className="rounded-lg border border-line bg-panel px-6 py-6 flex flex-col items-center justify-center">
      <div className="text-[11px] uppercase tracking-widest text-muted self-start mb-2">
        Model Safety Score
      </div>
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="var(--line)" strokeWidth="14" />
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 90 90)"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        <text x="90" y="86" textAnchor="middle" fontSize="34" fontWeight="700" fill="var(--text)" fontFamily="JetBrains Mono, monospace">
          {score}
        </text>
        <text x="90" y="106" textAnchor="middle" fontSize="11" fill="var(--muted)">
          / 100
        </text>
      </svg>
      <div className="mt-1 text-xs font-mono tracking-widest" style={{ color }}>
        {label}
      </div>
    </TiltCard>
  );
}
