# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server at http://localhost:5173
npm run build     # type-check (tsc -b) then bundle for production
npm run preview   # serve the production build locally
npx tsc -b        # type-check only, no emit — run this to verify changes compile
```

There are no tests or linters configured yet.

## Architecture

All state lives in a single React Context (`src/context/HabitContext.tsx`). The two canonical arrays — `habits[]` and `logs[]` — are stored in `useState` and persisted to `localStorage` on every change via a `useEffect`. Everything else is **derived**:

- `stats` (a `Record<habitId, HabitStats>`) is computed with `useMemo` by calling `computeStats()` for every habit. Never store computed values — update the two source arrays and let memos re-derive.
- `todayCompletionPercent` is derived from `stats` via another `useMemo`.

**Data model** (`src/types/habit.ts`):
- `Habit` — static definition (id, name, description, createdAt)
- `HabitLog` — one entry per completion (`habitId` + `date` string)
- `HabitStats` — computed, never persisted

**Date keys** are always `"YYYY-MM-DD"` strings in **local time**. All date logic lives in `src/lib/dates.ts`. Never use `Date.toISOString()` — it returns UTC and will produce the wrong date for users west of UTC after ~midnight local time. Always use `getFullYear/getMonth/getDate` via `toDateKey()`.

**Streak logic** (`src/lib/streaks.ts` → `computeStats()`): not completing *today* does not break a streak — the backwards walk starts from yesterday if today is incomplete. The streak only breaks when a past day (before today) is missing.

**Storage** (`src/lib/storage.ts`): `loadState` returns `{ habits: [], logs: [] }` on any error (corrupt/missing data). `saveState` prunes logs older than 365 days before writing to prevent unbounded localStorage growth.

## Key conventions

- **Tailwind dark theme**: `bg-zinc-950` page, `bg-zinc-900` cards, `border-zinc-800` borders, `orange-500` for accent/streaks, `emerald-500` for completed state.
- **No routing** — single page, no `react-router`.
- Modals use `createPortal` into `document.body` (`src/components/modals/Modal.tsx`), with Escape-to-close and backdrop-click-to-close.
- The delete flow always removes both the `Habit` and all its `HabitLog` entries to prevent orphan data.

## Git workflow

Commit every meaningful change with a conventional prefix (`feat:`, `fix:`, `refactor:`) and push immediately. Remote: `https://github.com/ahmedessam3le/habit-tracker` (branch: `master`).
