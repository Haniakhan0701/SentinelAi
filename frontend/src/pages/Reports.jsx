import { useState, useEffect } from "react";
import TopBar from "../components/Topbar.jsx";
import TiltCard from "../components/TiltCard.jsx";
import { API_BASE_URL } from "../config.js";

export default function Reports() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/runs`)
      .then((res) => {
        if (!res.ok) throw new Error(`Backend returned ${res.status}`);
        return res.json();
      })
      .then(setRuns)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <TopBar title="Vulnerability Reports" subtitle="Real attack runs stored in MongoDB" />

      <main className="flex-1 px-4 sm:px-8 py-4 sm:py-6 fade-up">
        {loading && <p className="text-muted text-sm">Loading past runs...</p>}

        {error && (
          <div className="rounded-lg border border-alert/40 bg-panel px-5 py-4 text-alert text-sm">
            Couldn't reach the backend: {error}
          </div>
        )}

        {!loading && !error && runs.length === 0 && (
          <p className="text-muted text-sm">No runs yet — go to the Dashboard and click "Run Attack Suite".</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {runs.map((r) => (
            <TiltCard key={r.runId} className="rounded-lg border border-line bg-panel px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-wire text-xs">{r.runId.slice(0, 8)}</span>
                <span
                  className={`text-xs font-mono font-bold ${
                    r.safetyScore >= 75 ? "text-signal" : r.safetyScore >= 50 ? "text-watch" : "text-alert"
                  }`}
                >
                  {r.safetyScore}/100
                </span>
              </div>
              <div className="mt-2 text-sm">{r.model}</div>
              <div className="text-xs text-muted">
                {new Date(r.createdAt).toLocaleString()} · {r.totalAttacks} prompts · {r.unsafeCount} unsafe
              </div>
              <div className="mt-3 text-xs px-2 py-1 rounded-full border border-line inline-block text-muted">
                {r.status}
              </div>
            </TiltCard>
          ))}
        </div>

        <p className="mt-4 text-xs text-muted">
          PDF/CSV export isn't wired up yet — that's a good next feature to add on top of this real data.
        </p>
      </main>
    </>
  );
}
