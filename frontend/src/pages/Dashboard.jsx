import { useState, useEffect, useCallback } from "react";
import TopBar from "../components/Topbar.jsx";
import StatCard from "../components/StatCard.jsx";
import SafetyGauge from "../components/SafetyGauge.jsx";
import AttackTypeChart from "../components/AttackTypeChart.jsx";
import LiveAttackFeed from "../components/LiveAttackFeed.jsx";
import { API_BASE_URL } from "../config.js";

export default function Dashboard() {
  const [data, setData] = useState(null);   // { run, breakdown, recentAttacks }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [runningAttack, setRunningAttack] = useState(false);

  const fetchLatestRun = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(`${API_BASE_URL}/runs/latest`);
      if (!res.ok) throw new Error(`Backend returned ${res.status}`);
      const json = await res.json();
      setData(json); // will be null if no run exists yet
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLatestRun();
  }, [fetchLatestRun]);

  async function handleRunAttack() {
    setRunningAttack(true);
    setError(null);
    try {
      // This takes ~80s (10 prompts, 8s apart to respect Gemini's free-tier
      // rate limit) — see backend/services/attackEngine.js.
      const res = await fetch(`${API_BASE_URL}/attacks/run`, { method: "POST" });
      if (!res.ok) throw new Error(`Backend returned ${res.status}`);
      await fetchLatestRun();
    } catch (err) {
      setError(err.message);
    } finally {
      setRunningAttack(false);
    }
  }

  if (loading) {
    return (
      <>
        <TopBar title="Attack Run Overview" subtitle="Loading..." />
        <main className="flex-1 px-4 sm:px-8 py-4 sm:py-6 text-muted">Connecting to backend...</main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <TopBar title="Attack Run Overview" subtitle="Connection error" />
        <main className="flex-1 px-4 sm:px-8 py-4 sm:py-6">
          <div className="rounded-lg border border-alert/40 bg-panel px-5 py-4 text-alert text-sm">
            Couldn't reach the backend: {error}. Make sure <code className="text-wire">npm run dev</code> is
            running inside your <code className="text-wire">backend</code> folder.
          </div>
        </main>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <TopBar title="Attack Run Overview" subtitle="No attack runs yet" />
        <main className="flex-1 px-4 sm:px-8 py-4 sm:py-6">
          <div className="rounded-lg border border-line bg-panel px-6 py-8 text-center">
            <p className="text-muted mb-4">No attack has been run yet. Trigger the real Attack Engine below.</p>
            <button
              onClick={handleRunAttack}
              disabled={runningAttack}
              className="rounded-md bg-signal/90 hover:bg-signal disabled:opacity-50 text-black font-semibold px-5 py-2 text-sm transition-colors"
            >
              {runningAttack ? "Running attacks... (~80s)" : "Run Attack Suite"}
            </button>
          </div>
        </main>
      </>
    );
  }

  const { run, breakdown, recentAttacks } = data;
  const totalUnsafe = run.unsafeCount;

  return (
    <>
      <TopBar
        title="Attack Run Overview"
        subtitle={
          <>
            Target model: <span className="text-wire font-mono">{run.model}</span> · Run {run.runId.slice(0, 8)}
          </>
        }
        right={
          <button
            onClick={handleRunAttack}
            disabled={runningAttack}
            className="flex items-center gap-2 rounded-full border border-line bg-panel2 px-3 py-1.5 text-xs text-muted hover:text-text disabled:opacity-50 transition-colors"
          >
            <span className={`h-2 w-2 rounded-full ${runningAttack ? "bg-watch pulse-dot" : "bg-signal"}`} />
            {runningAttack ? "Running... (~80s)" : "Run New Attack"}
          </button>
        }
      />

      <main className="flex-1 px-4 sm:px-8 py-4 sm:py-6 space-y-6 fade-up">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Prompts Fired" value={run.totalAttacks} sub="across 5 attack categories" />
          <StatCard label="Unsafe Responses" value={totalUnsafe} sub="flagged by response analyzer" tone="alert" />
          <StatCard
            label="Safe Rate"
            value={run.totalAttacks > 0 ? `${Math.round(((run.totalAttacks - totalUnsafe) / run.totalAttacks) * 100)}%` : "—"}
            sub="of all prompts sent"
            tone="signal"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AttackTypeChart data={breakdown} />
          </div>
          <SafetyGauge score={run.safetyScore} />
        </div>

        <LiveAttackFeed
          entries={recentAttacks.map((a) => ({
            id: a.promptId,
            type: a.type,
            verdict: a.verdict,
            confidence: a.confidence,
            time: new Date(a.createdAt).toLocaleTimeString()
          }))}
        />
      </main>
    </>
  );
}
