import TopBar from "../components/Topbar.jsx";
import TiltCard from "../components/TiltCard.jsx";

export default function Settings() {
  return (
    <>
      <TopBar title="Settings" subtitle="API keys and target model configuration" />

      <main className="flex-1 px-4 sm:px-8 py-4 sm:py-6 fade-up">
        <TiltCard className="rounded-lg border border-line bg-panel px-6 py-6 max-w-lg">
          <label className="block text-xs uppercase tracking-widest text-muted mb-2">Target Model API</label>
          <select className="w-full rounded-md border border-line bg-panel2 px-3 py-2 text-sm mb-5">
            <option>Google Gemini 1.5 Flash</option>
            <option>Google Gemini 1.0 Pro</option>
          </select>

          <label className="block text-xs uppercase tracking-widest text-muted mb-2">API Key</label>
          <input
            type="password"
            placeholder="••••••••••••••••"
            className="w-full rounded-md border border-line bg-panel2 px-3 py-2 text-sm mb-5"
          />

          <label className="block text-xs uppercase tracking-widest text-muted mb-2">Backend URL</label>
          <input
            type="text"
            placeholder="http://localhost:5000"
            className="w-full rounded-md border border-line bg-panel2 px-3 py-2 text-sm mb-6"
          />

          <button className="w-full rounded-md bg-signal/90 hover:bg-signal text-black font-semibold py-2 text-sm transition-colors">
            Save Settings
          </button>
        </TiltCard>

        <p className="mt-4 text-xs text-muted max-w-lg">
          This form doesn't save anything yet — it's a placeholder. Never commit real API keys into your
          GitHub repo; store them in a <code className="text-wire">.env</code> file on the backend instead.
        </p>
      </main>
    </>
  );
}
