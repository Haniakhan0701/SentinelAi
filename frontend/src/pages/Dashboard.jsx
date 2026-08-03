import TopBar from "../components/TopBar.jsx";
import StatCard from "../components/StatCard.jsx";
import SafetyGauge from "../components/SafetyGauge.jsx";
import AttackTypeChart from "../components/AttackTypeChart.jsx";
import LiveAttackFeed from "../components/LiveAttackFeed.jsx";
import { attackTypeBreakdown, liveAttackLog, modelUnderTest, computeSafetyScore } from "../data/mockData.js";

export default function Dashboard() {
  const totalUnsafe = attackTypeBreakdown.reduce((a, r) => a + r.unsafe, 0);
  const score = computeSafetyScore(attackTypeBreakdown);

  return (
    <>
      <TopBar
        title="Attack Run Overview"
        subtitle={
          <>
            Target model: <span className="text-wire font-mono">{modelUnderTest.name}</span> · Started {modelUnderTest.runStarted}
          </>
        }
        right={
          <div className="flex items-center gap-2 rounded-full border border-line bg-panel2 px-3 py-1.5 text-xs text-muted">
            <span className="h-2 w-2 rounded-full bg-signal pulse-dot" />
            Attack engine running
          </div>
        }
      />

      <main className="flex-1 px-8 py-6 space-y-6 fade-up">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Prompts Fired" value={modelUnderTest.totalAttacksRun} sub="across 5 attack categories" />
          <StatCard label="Unsafe Responses" value={totalUnsafe} sub="flagged by response analyzer" tone="alert" />
          <StatCard
            label="Safe Rate"
            value={`${Math.round(((modelUnderTest.totalAttacksRun - totalUnsafe) / modelUnderTest.totalAttacksRun) * 100)}%`}
            sub="of all prompts sent"
            tone="signal"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AttackTypeChart data={attackTypeBreakdown} />
          </div>
          <SafetyGauge score={score} />
        </div>

        <LiveAttackFeed entries={liveAttackLog} />
      </main>
    </>
  );
}
