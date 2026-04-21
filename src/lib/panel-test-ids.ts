import type { PanelId } from "./panels";

export const workspaceTestIds = {
  root: "workspace",
  emptyState: "workspace-empty-state",
  panelsViewport: "workspace-panels-viewport",
  panelsTrack: "workspace-panels-track",
} as const;

export function getSidebarToggleTestId(panelId: PanelId) {
  return `sidebar-toggle-${panelId}`;
}

export function getPanelRootTestId(panelId: PanelId) {
  return `panel-root-${panelId}`;
}

export function getPanelCloseTestId(panelId: PanelId) {
  return `panel-close-${panelId}`;
}

export function getPanelDragHandleTestId(panelId: PanelId) {
  return `panel-drag-handle-${panelId}`;
}

export function getPanelTitleTestId(panelId: PanelId) {
  return `panel-title-${panelId}`;
}
