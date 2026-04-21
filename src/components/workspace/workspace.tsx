"use client";

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { useEffect, useState } from "react";
import { workspaceTestIds } from "@/lib/panel-test-ids";
import {
  closePanel,
  createInitialPanels,
  reorderVisiblePanels,
  togglePanel,
  type PanelId,
} from "@/lib/panels";
import { EmptyState } from "./empty-state";
import { SortablePanel } from "./sortable-panel";
import { StaticPanel } from "./static-panel";
import { WorkspaceSidebar } from "./workspace-sidebar";

export function Workspace() {
  const [panels, setPanels] = useState(createInitialPanels);
  const [isHydrated, setIsHydrated] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );
  const visiblePanels = panels.filter((panel) => panel.isOpen);
  const PanelComponent = isHydrated ? SortablePanel : StaticPanel;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  function handleToggle(panelId: PanelId) {
    setPanels((currentPanels) => togglePanel(currentPanels, panelId));
  }

  function handleClose(panelId: PanelId) {
    setPanels((currentPanels) => closePanel(currentPanels, panelId));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setPanels((currentPanels) =>
      reorderVisiblePanels(
        currentPanels,
        String(active.id),
        String(over.id),
      ),
    );
  }

  return (
    <div
      data-testid={workspaceTestIds.root}
      className="flex min-h-screen w-full overflow-hidden bg-white"
    >
      <WorkspaceSidebar panels={panels} onToggle={handleToggle} />

      <div className="flex min-w-0 flex-1 flex-col bg-white">
        {visiblePanels.length > 0 ? (
          isHydrated ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToHorizontalAxis]}
              onDragEnd={handleDragEnd}
            >
              <div
                data-testid={workspaceTestIds.panelsViewport}
                className="h-full overflow-x-auto overflow-y-hidden"
              >
                <SortableContext
                  items={visiblePanels.map((panel) => panel.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  <div
                    data-testid={workspaceTestIds.panelsTrack}
                    className="flex h-full min-w-full"
                  >
                    {visiblePanels.map((panel) => (
                      <PanelComponent
                        key={panel.id}
                        panel={panel}
                        onClose={handleClose}
                      />
                    ))}
                  </div>
                </SortableContext>
              </div>
            </DndContext>
          ) : (
            <div
              data-testid={workspaceTestIds.panelsViewport}
              className="h-full overflow-x-auto overflow-y-hidden"
            >
              <div
                data-testid={workspaceTestIds.panelsTrack}
                className="flex h-full min-w-full"
              >
                {visiblePanels.map((panel) => (
                  <PanelComponent
                    key={panel.id}
                    panel={panel}
                    onClose={handleClose}
                  />
                ))}
              </div>
            </div>
          )
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
