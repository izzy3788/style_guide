# Docs Style Guide (Internal)

This file records the current docs layout decisions and styling rules so the team can keep the UI consistent.

## Layout Structure
- App Router: `apps/docs/app/(docs)/layout.tsx`
- Layout shell uses shadcn-style Sidebar components.
- Structure:
  - Left Sidebar (fixed, 260px) + Main Content
  - Main content wrapper: `max-w-3xl` and padded
  - Typography (prose) applies **only** to `<article>` in the main content

## Typography (Prose) Rules
- Prose applies only to `<article>`:
  - `prose prose-neutral dark:prose-invert max-w-none`
  - Link underline removed via prose modifiers
- Sidebar/Header/Custom UI blocks must **not** inherit prose.
- Use `not-prose` wrapper for shadcn UI components (Card/Table/CodeSnippet/Usage blocks).

## Spacing Rules
- Spacing scale (px): `2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 64`
- Use Tailwind spacing utilities only (no arbitrary values).
- Page-level vertical spacing: `space-y-12` (48px).
- Section spacing: `space-y-6` (24px).
- Card padding: `p-6` (24px).
- Card internal gaps: `gap-3` or `gap-4` (12px / 16px).
- Inline gaps: `gap-2` (8px).
- If in doubt, choose the closest value from the scale.

## Sidebar Styling
- Sidebar uses shadcn-style primitives (`components/ui/sidebar.tsx`).
- Section titles are uppercase, muted.
- Links:
  - Base: `text-body-sm text-foreground/80`
  - Hover: `text-foreground`
  - Active: `bg-muted rounded-md font-medium text-foreground`
- **No underline** on sidebar links.

## Header Pattern (Each Doc Page)
Use this pattern at the top of each page:
- h1: `text-title-lg`
- description: `text-body-sm text-muted-foreground mt-2`
- divider: `mt-6 mb-10 border-b border-border`
- Wrap header with `className="not-prose"`

## Colors Page Structure
- "Usage principles" is wrapped in `Card`.
- Tokens are rendered with shadcn `Table`.
- Section separators use `Separator`.
- UI blocks are wrapped in `not-prose`.

## Key Files
- Layout: `apps/docs/app/(docs)/layout.tsx`
- Sidebar: `apps/docs/app/(docs)/_components/Sidebar.tsx`
- Prose config: `apps/docs/tailwind.config.ts` + `apps/docs/app/(docs)/layout.tsx`
- UI Components: `apps/docs/components/ui/*`

## Notes
- If prose seems to affect layout elements, ensure those elements are **outside** `<article>` or wrapped in `not-prose`.
- Always restart dev server after tailwind config changes.

## Team Notes (2026-02-11)
- Tailwind v4: use `@import "tailwindcss/preflight";` + `@tailwind utilities;` (no `@tailwind base/components`).
- Spacing system: `2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 64`.
  - Page vertical: `space-y-12` (48px)
  - Section: `space-y-6` (24px)
  - Card padding: `p-6` (24px)
  - Card internal gaps: `gap-3` or `gap-4`
  - Inline gaps: `gap-2`
- Gray system includes `gray-00` (`#FFFFFF`) + `gray-50`~`gray-1000`. Use only gray tokens in UI.
- Brand colors:
  - Primary scale anchored to `primary-500 = #2B4DF7`
  - Secondary scale anchored to `secondary-500 = #3390FF`
  - Tailwind classes available: `bg-primary-500`, `text-secondary-600`, etc.
  - Secondary is for links/info/focus; never use as primary CTA.
- System (semantic) colors:
  - `error #D32F2F`, `warning #F9A825`, `success #4CAF50`, `info #0091EA`
  - Use only for text/icon/left border/accent/soft background (`bg-*/10`)
  - Do not use as full background or primary CTA
  - Use white or `gray-900` on colored backgrounds; always pair with text (not color-only).
- Destructive button text must be white (`#FFFFFF`).

## On-Color Mapping (2026-02-12)
When a component uses a colored background, its text/icon color must use the matching `on-*` token.

Primary scale:
- `primary-50/100/200/300` → `on-primary` = `gray-900`
- `primary-400/500/600/700/800/900` → `on-primary` = `gray-00`

Secondary scale:
- `secondary-50/100/200/300` → `on-secondary` = `gray-900`
- `secondary-400/500/600/700/800/900` → `on-secondary` = `gray-00`

Implementation notes:
- Tokens live in `apps/docs/app/globals.css` as `--on-primary-*` / `--on-secondary-*`.
- Prefer `text-[color:var(--on-primary-500)]` or `text-[color:var(--on-secondary-500)]` when using the 500 shade.

## Team Notes (2026-02-19)
- Docs pages must keep `Preview` and `CodeSnippet` synchronized. Example code and rendered preview should not diverge.
- Sidebar sections stay as collapsible groups. Keep layout stable when scrollbar appears by preserving `scrollbar-gutter: stable` behavior in `components/ui/sidebar.tsx`.
- Toggle naming rule:
  - Docs/nav label uses `Toggle`.
  - Implementation remains `switch.tsx` base with `toggle.tsx` wrapper.
- Tooltip standard:
  - Keep Radix Tooltip primitive structure (`TooltipProvider/Tooltip/TooltipTrigger/TooltipContent`).
  - Default `sideOffset` is `4`, align is `center`.
  - Default is no-wrap with max width for stable Korean text; use wrap option only when needed.
  - Provider default delay is `0` (show immediately on hover/focus).
- Dropdown Menu standard:
  - Base item text uses `gray-900`.
  - Danger item keeps red text on highlighted state; only background changes.
  - Label typography follows Body 3 intent with compact vertical spacing (`py-0.5`).
