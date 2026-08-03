import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import TiltCard from "./TiltCard.jsx";

export default function AttackTypeChart({ data }) {
  const chartData = data.map((d) => ({
    type: d.type,
    Safe: d.total - d.unsafe,
    Unsafe: d.unsafe
  }));

  return (
    <TiltCard className="rounded-lg border border-line bg-panel px-5 py-5">
      <div className="text-[11px] uppercase tracking-widest text-muted mb-4">
        Results by Attack Category
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} margin={{ left: -10 }}>
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <XAxis dataKey="type" tick={{ fill: "var(--muted)", fontSize: 11 }} axisLine={{ stroke: "var(--line)" }} tickLine={false} />
          <YAxis tick={{ fill: "var(--muted)", fontSize: 11 }} axisLine={{ stroke: "var(--line)" }} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "var(--panel2)", border: "1px solid var(--line)", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "var(--text)" }}
          />
          <Bar dataKey="Safe" stackId="a" fill="var(--signal)" radius={[0, 0, 0, 0]} />
          <Bar dataKey="Unsafe" stackId="a" fill="var(--alert)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </TiltCard>
  );
}
