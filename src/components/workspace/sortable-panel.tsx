import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { panelRegistry, type PanelConfig, type PanelId } from "@/lib/panels";
import { cn } from "@/lib/utils";

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
      style={style}
      className={cn(
        "flex h-full min-w-[22rem] grow basis-0 flex-col border-l border-slate-200 bg-white",
        isDragging && "z-10 shadow-2xl shadow-slate-200/90",
      )}
    >
      <header className="flex h-12 items-center gap-2 border-b border-slate-200 bg-slate-50/90 pl-3 pr-2">
        <button
          type="button"
          className={cn(
            "flex min-w-0 flex-1 items-center justify-center rounded-full px-3 py-1 text-[15px] font-medium text-slate-700 transition",
            isDragging ? "cursor-grabbing" : "cursor-grab hover:bg-slate-100",
          )}
          aria-label={`Drag to reorder ${metadata.title} panel`}
          {...attributes}
          {...listeners}
        >
          <span>{metadata.title}</span>
        </button>
        <button
          type="button"
          aria-label={`Close ${metadata.title} panel`}
          onClick={() => onClose(panel.id)}
          className="rounded-full p-1 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
        >
          <XMarkIcon className="size-5" />
        </button>
      </header>

      <div className="relative flex flex-1 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,250,252,0.92),transparent_42%)]" />
        <div className="absolute inset-6 rounded-[32px] border border-dashed border-slate-100" />
        <div className="absolute bottom-8 left-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-200">
          {metadata.title}
        </div>
      </div>
    </section>
  );
}
