import { useState, useEffect } from "react";
import TopBar from "../components/Topbar.jsx";
import TiltCard from "../components/TiltCard.jsx";
import { API_BASE_URL } from "../config.js";

export default function AttackLibrary() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/prompts`)
      .then((res) => {
        if (!res.ok) throw new Error(`Backend returned ${res.status}`);
        return res.json();
      })
      .then(setPrompts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <TopBar title="Attack Prompt Library" subtitle="The real adversarial prompts your Attack Engine sends to the target model" />

      <main className="flex-1 px-4 sm:px-8 py-4 sm:py-6 fade-up">
        {loading && <p className="text-muted text-sm">Loading prompt library...</p>}

        {error && (
          <div className="rounded-lg border border-alert/40 bg-panel px-5 py-4 text-alert text-sm">
            Couldn't reach the backend: {error}
          </div>
        )}

        {!loading && !error && (
          <TiltCard className="rounded-lg border border-line bg-panel overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-line text-left text-[11px] uppercase tracking-widest text-muted">
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Prompt</th>
                </tr>
              </thead>
              <tbody>
                {prompts.map((row) => (
                  <tr key={row.promptId} className="border-b border-line/60 last:border-0 hover:bg-panel2/50">
                    <td className="px-5 py-3 font-mono text-wire">{row.promptId}</td>
                    <td className="px-5 py-3">{row.type}</td>
                    <td className="px-5 py-3 text-muted max-w-lg">{row.prompt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TiltCard>
        )}
      </main>
    </>
  );
}
