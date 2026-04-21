import { type PanelConfig, type PanelId } from "@/lib/panels";
import { PanelShell } from "./panel-shell";

type StaticPanelProps = {
  panel: PanelConfig;
  onClose: (panelId: PanelId) => void;
};

export function StaticPanel({ panel, onClose }: StaticPanelProps) {
  return (
    <section className="flex h-full min-w-[22rem] grow basis-0 flex-col border-l border-slate-200 bg-white">
      <PanelShell panel={panel} onClose={onClose} />
    </section>
  );
}
