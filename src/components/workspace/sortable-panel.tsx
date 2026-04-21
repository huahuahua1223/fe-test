import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type PanelConfig, type PanelId } from "@/lib/panels";
import { cn } from "@/lib/utils";
import { PanelShell } from "./panel-shell";

type SortablePanelProps = {
  panel: PanelConfig;
  onClose: (panelId: PanelId) => void;
};

export function SortablePanel({ panel, onClose }: SortablePanelProps) {
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
      style={style}
      className={cn(
        "flex h-full min-w-[22rem] grow basis-0 flex-col border-l border-slate-200 bg-white",
        isDragging && "z-10 shadow-2xl shadow-slate-200/90",
      )}
    >
      <PanelShell
        panel={panel}
        isDragging={isDragging}
        dragHandleProps={{ ...attributes, ...listeners }}
        onClose={onClose}
      />
    </section>
  );
}
