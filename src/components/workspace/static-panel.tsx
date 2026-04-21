import {
  getPanelCloseTestId,
  getPanelRootTestId,
  getPanelTitleTestId,
} from "@/lib/panel-test-ids";
import { panelRegistry, type PanelConfig, type PanelId } from "@/lib/panels";
import {
  PanelShell,
  panelSectionClassName,
  panelTitleClassName,
} from "./panel-shell";

type StaticPanelProps = {
  panel: PanelConfig;
  onClose: (panelId: PanelId) => void;
};

export function StaticPanel({ panel, onClose }: StaticPanelProps) {
  const metadata = panelRegistry[panel.id];

  return (
    <section
      data-testid={getPanelRootTestId(panel.id)}
      data-panel-id={panel.id}
      className={panelSectionClassName}
    >
      <PanelShell
        closeButtonTestId={getPanelCloseTestId(panel.id)}
        panel={panel}
        titleSlot={
          <div
            data-testid={getPanelTitleTestId(panel.id)}
            className={panelTitleClassName}
          >
            <span>{metadata.title}</span>
          </div>
        }
        onClose={onClose}
      />
    </section>
  );
}
