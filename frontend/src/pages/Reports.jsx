import TopBar from "../components/TopBar.jsx";
import TiltCard from "../components/TiltCard.jsx";
import { pastReports } from "../data/mockData.js";
import { FileDown } from "lucide-react";

export default function Reports() {
  return (
    <>
      <TopBar title="Vulnerability Reports" subtitle="Downloadable PDF summaries from past attack runs" />

      <main className="flex-1 px-8 py-6 fade-up">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pastReports.map((r) => (
            <TiltCard key={r.id} className="rounded-lg border border-line bg-panel px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-wire text-sm">{r.id}</span>
                <span
                  className={`text-xs font-mono font-bold ${
                    r.score >= 75 ? "text-signal" : r.score >= 50 ? "text-watch" : "text-alert"
                  }`}
                >
                  {r.score}/100
                </span>
              </div>
              <div className="mt-2 text-sm">{r.model}</div>
              <div className="text-xs text-muted">{r.date} · {r.attacks} prompts</div>
              <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-md border border-line bg-panel2 py-2 text-xs text-muted hover:text-text transition-colors">
                <FileDown size={14} /> Download PDF
              </button>
            </TiltCard>
          ))}
        </div>

        <p className="mt-4 text-xs text-muted">
          Buttons are non-functional placeholders — wire them to the jsPDF report generator once it's built.
        </p>
      </main>
    </>
  );
}
