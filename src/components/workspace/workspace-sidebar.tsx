import { getSidebarToggleTestId } from "@/lib/panel-test-ids";
import { panelRegistry, type PanelConfig, type PanelId } from "@/lib/panels";
import { cn } from "@/lib/utils";

type WorkspaceSidebarProps = {
  panels: PanelConfig[];
  onToggle: (panelId: PanelId) => void;
};

export function WorkspaceSidebar({
  panels,
  onToggle,
}: WorkspaceSidebarProps) {
  return (
    <aside className="flex w-20 shrink-0 border-r border-slate-200 bg-white">
      <nav className="flex w-full flex-col px-2 py-5" aria-label="Panel navigation">
        <ul className="space-y-2">
          {panels.map((panel) => {
            const metadata = panelRegistry[panel.id];
            const Icon = metadata.Icon;

            return (
              <li key={panel.id}>
                <button
                  type="button"
                  data-testid={getSidebarToggleTestId(panel.id)}
                  data-panel-id={panel.id}
                  onClick={() => onToggle(panel.id)}
                  aria-pressed={panel.isOpen}
                  className={cn(
                    "flex w-full flex-col items-center gap-1 rounded-2xl px-2 py-3 text-center transition",
                    panel.isOpen
                      ? "text-slate-900 hover:bg-slate-100"
                      : "text-slate-300 hover:bg-slate-100 hover:text-slate-500",
                  )}
                >
                  <Icon className="size-7" aria-hidden="true" />
                  <span className="text-[15px] font-medium">{metadata.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
