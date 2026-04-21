# FE Test Workspace

![效果图](s.png)

基于 `Next.js + TypeScript + Tailwind CSS + dnd-kit` 实现的单页工作台，用于还原题目中的左侧固定导航与右侧可拖拽面板布局。

## 功能点

- 左侧固定导航，右侧 3 个面板横向排列
- 窄屏下右侧面板区域支持横向滚动，左侧导航保持固定
- 点击面板右上角 `X` 可关闭面板
- 关闭后左侧图标置灰，再次点击左侧按钮可恢复
- 使用 `dnd-kit` 实现顶部横向拖拽排序
- 拖拽排序后，左侧图标顺序与右侧面板顺序保持一致
- 面板内部保持轻量留白，占位不引入额外业务功能

## 技术栈

- `Next.js 15` App Router
- `React 19`
- `TypeScript`
- `Tailwind CSS`
- `dnd-kit`
- `Heroicons`
- `Vitest`

## 本地启动

```bash
pnpm install
pnpm dev
```

默认访问 [http://localhost:3000](http://localhost:3000)。

## 质量检查

```bash
pnpm lint
pnpm test
pnpm build
```

## 目录结构

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/workspace/
    empty-state.tsx
    sortable-panel.tsx
    workspace-sidebar.tsx
    workspace.tsx
  lib/
    panels.ts
    panels.test.ts
    utils.ts
```

## 实现说明

- 使用单一 `PanelConfig[]` 作为唯一状态源，同时驱动左侧导航顺序、右侧面板顺序和开关状态
- 关闭面板时仅切换 `isOpen`，不丢失当前排序位置
- 拖拽时只对当前可见面板进行排序，隐藏面板保留原有插槽位置
- 页面样式贴近题图，保持浅色留白和清晰分栏

## 部署

项目可直接部署到 Vercel 等支持 Next.js 的平台。
