import { workspaceTestIds } from "@/lib/panel-test-ids";

export function EmptyState() {
  return (
    <div
      data-testid={workspaceTestIds.emptyState}
      className="flex h-full flex-1 items-center justify-center border-l border-slate-200 bg-white px-6"
    >
      <div className="max-w-sm rounded-[28px] border border-dashed border-slate-200 bg-slate-50/80 px-8 py-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
          Workspace Hidden
        </p>
        <h2 className="mt-4 text-xl font-semibold text-slate-700">
          All panels are closed.
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Use the fixed navigation on the left to reopen Map, Music, or Chat.
        </p>
      </div>
    </div>
  );
}
