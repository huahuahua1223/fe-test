import type { ComponentType, SVGProps } from "react";
import {
  ChatBubbleBottomCenterIcon,
  MapIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import { arrayMove } from "@dnd-kit/sortable";

export type PanelId = "map" | "music" | "chat";

export type PanelConfig = {
  id: PanelId;
  isOpen: boolean;
};

type PanelMetadata = {
  title: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const panelRegistry: Record<PanelId, PanelMetadata> = {
  map: {
    title: "Map",
    Icon: MapIcon,
  },
  music: {
    title: "Music",
    Icon: MusicalNoteIcon,
  },
  chat: {
    title: "Chat",
    Icon: ChatBubbleBottomCenterIcon,
  },
};

export function createInitialPanels(): PanelConfig[] {
  return [
    { id: "map", isOpen: true },
    { id: "music", isOpen: true },
    { id: "chat", isOpen: true },
  ];
}

export function togglePanel(panels: PanelConfig[], panelId: PanelId): PanelConfig[] {
  return panels.map((panel) =>
    panel.id === panelId ? { ...panel, isOpen: !panel.isOpen } : panel,
  );
}

export function closePanel(panels: PanelConfig[], panelId: PanelId): PanelConfig[] {
  return panels.map((panel) =>
    panel.id === panelId ? { ...panel, isOpen: false } : panel,
  );
}

export function reorderVisiblePanels(
  panels: PanelConfig[],
  activeId: string,
  overId: string,
): PanelConfig[] {
  const visiblePanels = panels.filter((panel) => panel.isOpen);
  const activeIndex = visiblePanels.findIndex((panel) => panel.id === activeId);
  const overIndex = visiblePanels.findIndex((panel) => panel.id === overId);

  if (activeIndex < 0 || overIndex < 0 || activeIndex === overIndex) {
    return panels;
  }

  const reorderedVisiblePanels = arrayMove(visiblePanels, activeIndex, overIndex);
  let nextVisiblePanelIndex = 0;

  return panels.map((panel) => {
    if (!panel.isOpen) {
      return panel;
    }

    const nextPanel = reorderedVisiblePanels[nextVisiblePanelIndex];
    nextVisiblePanelIndex += 1;
    return nextPanel;
  });
}
