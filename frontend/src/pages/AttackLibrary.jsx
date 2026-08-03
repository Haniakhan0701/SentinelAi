import TopBar from "../components/TopBar.jsx";
import TiltCard from "../components/TiltCard.jsx";
import { attackPromptLibrary } from "../data/mockData.js";

const severityColor = {
  Critical: "text-alert",
  High: "text-watch",
  Medium: "text-wire"
};

export default function AttackLibrary() {
  return (
    <>
      <TopBar title="Attack Prompt Library" subtitle="The adversarial prompts your Attack Engine sends to the target model" />

      <main className="flex-1 px-8 py-6 fade-up">
        <TiltCard className="rounded-lg border border-line bg-panel overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-[11px] uppercase tracking-widest text-muted">
                <th className="px-5 py-3 font-medium">ID</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Prompt</th>
                <th className="px-5 py-3 font-medium">Severity</th>
                <th className="px-5 py-3 font-medium text-right">Times Used</th>
              </tr>
            </thead>
            <tbody>
              {attackPromptLibrary.map((row) => (
                <tr key={row.id} className="border-b border-line/60 last:border-0 hover:bg-panel2/50">
                  <td className="px-5 py-3 font-mono text-wire">{row.id}</td>
                  <td className="px-5 py-3">{row.type}</td>
                  <td className="px-5 py-3 text-muted max-w-md">{row.prompt}</td>
                  <td className={`px-5 py-3 font-semibold ${severityColor[row.severity]}`}>{row.severity}</td>
                  <td className="px-5 py-3 text-right font-mono">{row.timesUsed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TiltCard>

        <p className="mt-4 text-xs text-muted">
          This list is mock data. Once the backend attack engine exists, replace this with a fetch to
          <code className="mx-1 text-wire">/api/prompts</code> and add a button here to trigger a new attack run.
        </p>
      </main>
    </>
  );
}
