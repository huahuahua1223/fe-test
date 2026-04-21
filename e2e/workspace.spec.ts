import { expect, test, type Page } from "@playwright/test";
import type { PanelId } from "../src/lib/panels";
import {
  getPanelCloseTestId,
  getPanelDragHandleTestId,
  getPanelRootTestId,
  getSidebarToggleTestId,
  workspaceTestIds,
} from "../src/lib/panel-test-ids";

const hydrationMismatchPattern =
  /hydration|tree hydrated|server rendered html|didn't match/i;

async function getPanelOrder(page: Page) {
  return page
    .getByTestId(workspaceTestIds.panelsTrack)
    .locator("[data-panel-id]")
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("data-panel-id") ?? ""),
    );
}

async function getSidebarOrder(page: Page) {
  return page
    .getByRole("navigation", { name: "Panel navigation" })
    .locator("button[data-panel-id]")
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("data-panel-id") ?? ""),
    );
}

async function dragPanelBefore(page: Page, sourceId: PanelId, targetId: PanelId) {
  const sourceHandle = page.getByTestId(getPanelDragHandleTestId(sourceId));
  const targetHandle = page.getByTestId(getPanelDragHandleTestId(targetId));

  await expect(sourceHandle).toBeVisible();
  await expect(targetHandle).toBeVisible();

  const sourceBox = await sourceHandle.boundingBox();
  const targetBox = await targetHandle.boundingBox();

  if (!sourceBox || !targetBox) {
    throw new Error("Unable to resolve drag handle positions.");
  }

  const sourceX = sourceBox.x + sourceBox.width / 2;
  const sourceY = sourceBox.y + sourceBox.height / 2;
  const targetX = targetBox.x + targetBox.width / 2;
  const targetY = targetBox.y + targetBox.height / 2;

  await page.mouse.move(sourceX, sourceY);
  await page.mouse.down();
  await page.mouse.move(sourceX + 12, sourceY, { steps: 4 });
  await page.mouse.move(targetX, targetY, { steps: 24 });
  await page.mouse.up();
}

test("workspace interactions remain stable", async ({ page }) => {
  const hydrationIssues: string[] = [];

  page.on("console", (message) => {
    const text = message.text();

    if (
      (message.type() === "warning" || message.type() === "error") &&
      hydrationMismatchPattern.test(text)
    ) {
      hydrationIssues.push(`${message.type()}: ${text}`);
    }
  });

  page.on("pageerror", (error) => {
    if (hydrationMismatchPattern.test(error.message)) {
      hydrationIssues.push(`pageerror: ${error.message}`);
    }
  });

  await page.goto("/");

  await expect(page.getByTestId(workspaceTestIds.root)).toBeVisible();
  await expect(page.getByTestId(getPanelRootTestId("map"))).toBeVisible();
  await expect(page.getByTestId(getPanelRootTestId("music"))).toBeVisible();
  await expect(page.getByTestId(getPanelRootTestId("chat"))).toBeVisible();

  await expect(page.getByTestId(getPanelDragHandleTestId("map"))).toBeVisible();
  await expect(page.getByTestId(getPanelDragHandleTestId("music"))).toBeVisible();
  await expect(page.getByTestId(getPanelDragHandleTestId("chat"))).toBeVisible();

  await expect
    .poll(() => getPanelOrder(page))
    .toEqual(["map", "music", "chat"]);
  await expect
    .poll(() => getSidebarOrder(page))
    .toEqual(["map", "music", "chat"]);

  await page.getByTestId(getPanelCloseTestId("music")).click();

  await expect(page.getByTestId(getPanelRootTestId("music"))).toHaveCount(0);
  await expect(page.getByTestId(getSidebarToggleTestId("music"))).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await expect.poll(() => getPanelOrder(page)).toEqual(["map", "chat"]);

  await page.getByTestId(getSidebarToggleTestId("music")).click();

  await expect(page.getByTestId(getPanelRootTestId("music"))).toBeVisible();
  await expect(page.getByTestId(getSidebarToggleTestId("music"))).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect
    .poll(() => getPanelOrder(page))
    .toEqual(["map", "music", "chat"]);

  await dragPanelBefore(page, "chat", "map");

  await expect
    .poll(() => getPanelOrder(page))
    .toEqual(["chat", "map", "music"]);
  await expect
    .poll(() => getSidebarOrder(page))
    .toEqual(["chat", "map", "music"]);

  expect(hydrationIssues).toEqual([]);
});
