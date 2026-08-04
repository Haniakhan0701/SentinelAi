import TopBar from "../components/Topbar.jsx";
import TiltCard from "../components/TiltCard.jsx";
import { hardwareStatus } from "../data/mockData.js";
import { Cpu, Wifi, WifiOff } from "lucide-react";

export default function HardwareStatus() {
  const { connected, port, lastPing, components } = hardwareStatus;

  return (
    <>
      <TopBar
        title="Hardware Status"
        subtitle="Arduino Nano connection and alert component states"
      />

      <main className="flex-1 px-4 sm:px-8 py-4 sm:py-6 space-y-6 fade-up">
        <TiltCard className="rounded-lg border border-line bg-panel px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {connected ? <Wifi className="text-signal" size={20} /> : <WifiOff className="text-alert" size={20} />}
            <div>
              <div className="font-semibold">{connected ? "Connected" : "Disconnected"}</div>
              <div className="text-xs text-muted">
                Port <span className="font-mono text-wire">{port}</span> · last ping {lastPing}
              </div>
            </div>
          </div>
          <Cpu className="text-muted" size={28} />
        </TiltCard>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {components.map((c) => (
            <TiltCard key={c.name} className="rounded-lg border border-line bg-panel px-5 py-4 flex items-center justify-between">
              <span className="text-sm">{c.name}</span>
              <span className="text-xs font-mono px-2 py-1 rounded-full border border-line text-muted">{c.state}</span>
            </TiltCard>
          ))}
        </div>

        <p className="text-xs text-muted">
          This page is mock data for now. Once the Arduino serial-communication code is ready, this will
          poll the backend for live LED/buzzer state instead.
        </p>
      </main>
    </>
  );
}
