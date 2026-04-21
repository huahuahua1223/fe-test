import { describe, expect, it } from "vitest";
import {
  closePanel,
  createInitialPanels,
  reorderVisiblePanels,
  togglePanel,
} from "./panels";

describe("panel state helpers", () => {
  it("toggles a panel without changing order", () => {
    const panels = createInitialPanels();

    expect(togglePanel(panels, "music")).toEqual([
      { id: "map", isOpen: true },
      { id: "music", isOpen: false },
      { id: "chat", isOpen: true },
    ]);
  });

  it("closes a panel explicitly", () => {
    const panels = createInitialPanels();

    expect(closePanel(panels, "chat")).toEqual([
      { id: "map", isOpen: true },
      { id: "music", isOpen: true },
      { id: "chat", isOpen: false },
    ]);
  });

  it("reorders only the visible panels and preserves hidden slots", () => {
    const panels = [
      { id: "map", isOpen: true },
      { id: "music", isOpen: false },
      { id: "chat", isOpen: true },
    ] as const;

    expect(reorderVisiblePanels([...panels], "chat", "map")).toEqual([
      { id: "chat", isOpen: true },
      { id: "music", isOpen: false },
      { id: "map", isOpen: true },
    ]);
  });
});
