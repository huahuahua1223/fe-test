import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  getPanelCloseTestId,
  getPanelDragHandleTestId,
  getPanelRootTestId,
} from "@/lib/panel-test-ids";
import { panelRegistry, type PanelConfig, type PanelId } from "@/lib/panels";
import { cn } from "@/lib/utils";
import {
  PanelShell,
  panelSectionClassName,
  panelTitleClassName,
} from "./panel-shell";

type SortablePanelProps = {
  panel: PanelConfig;
  onClose: (panelId: PanelId) => void;
};

export function SortablePanel({ panel, onClose }: SortablePanelProps) {
  const metadata = panelRegistry[panel.id];
  const { attributes, listeners, isDragging, setNodeRef, transform, transition } =
    useSortable({
      id: panel.id,
      transition: {
        duration: 220,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <section
      ref={setNodeRef}
      data-testid={getPanelRootTestId(panel.id)}
      data-panel-id={panel.id}
      style={style}
      className={cn(
        panelSectionClassName,
        isDragging && "z-10 shadow-2xl shadow-slate-200/90",
      )}
    >
      <PanelShell
        closeButtonTestId={getPanelCloseTestId(panel.id)}
        panel={panel}
        titleSlot={
          <button
            type="button"
            data-testid={getPanelDragHandleTestId(panel.id)}
            aria-label={`Drag to reorder ${metadata.title} panel`}
            className={cn(
              panelTitleClassName,
              isDragging ? "cursor-grabbing" : "cursor-grab hover:bg-slate-100",
            )}
            {...attributes}
            {...listeners}
          >
            <span>{metadata.title}</span>
          </button>
        }
        onClose={onClose}
      />
    </section>
  );
}
