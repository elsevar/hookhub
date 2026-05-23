# HookHub — MVP Spec

## Overview

HookHub is a Next.js 16 web app that displays a curated grid of open-source Claude Code hooks. Visitors can browse hooks, filter by category, and click through to the source GitHub repository.

Claude Code hooks are deterministic shell/HTTP/LLM triggers that execute at specific lifecycle points in a Claude Code session (e.g. before a tool runs, after a file is written, when a session starts). The community publishes these on GitHub — HookHub is the central place to discover them.

**MVP scope:** Display only. No user accounts, no submission form, no ratings, no search.

---

## Data Model

```typescript
type HookCategory =
  | 'security'
  | 'code-quality'
  | 'notifications'
  | 'context-management'
  | 'workflow-automation'

type HookEventType =
  | 'PreToolUse'
  | 'PostToolUse'
  | 'SessionStart'
  | 'SessionEnd'
  | 'Stop'
  | 'UserPromptSubmit'
  | 'Notification'
  | 'other'

type Hook = {
  id: string           // URL-safe slug, e.g. "protect-secrets"
  name: string         // display name, e.g. "Protect Secrets"
  category: HookCategory
  eventType: HookEventType
  description: string  // 1–2 sentence summary
  repoUrl: string      // GitHub repo or direct file link
  author: string       // GitHub username
}
```

**Data source:** Static JSON at `data/hooks.json` — seeded with ~12 real community hooks. No database for MVP.

---

## Routes

| Route | Description |
|-------|-------------|
| `/`   | Home — hero + full hook grid with category filter |

No other routes for MVP.

---

## Component Breakdown

| Component | Path | Responsibility |
|-----------|------|---------------|
| `HookCard` | `components/HookCard.tsx` | Single hook: name, category badge, event type chip, description, "View on GitHub" link |
| `HookGrid` | `components/HookGrid.tsx` | Responsive grid of `HookCard`s |
| `CategoryFilter` | `components/CategoryFilter.tsx` | Row of filter pills; "All" + one per category |
| Home page | `app/page.tsx` | Composes hero, `CategoryFilter`, `HookGrid`; reads `data/hooks.json` |

---

## UI Design Guidelines

- **Grid:** 1 col (mobile) → 2 col (md) → 3 col (lg)
- **Cards:** Rounded corners, subtle border, hover shadow lift, no external UI library
- **Category badges — color mapping:**
  - `security` → red
  - `code-quality` → blue
  - `notifications` → yellow
  - `context-management` → purple
  - `workflow-automation` → green
- **Dark mode:** Supported via Tailwind (globals.css already defines dark mode vars)
- **Font:** Geist (already wired in `app/layout.tsx`)
- **Styling:** Tailwind classes only — no inline styles, no CSS modules

### Code conventions (from `memory/frontend/CLAUDE.md`)
- `const` over `function`; type all props
- Event handlers prefixed with `handle`
- Early returns for readability
- Accessibility attributes on interactive elements (`tabIndex`, `aria-label`, `onKeyDown`)

---

## Seed Data

| Name | Category | Event | Author | Repo |
|------|----------|-------|--------|------|
| Protect Secrets | security | PreToolUse | disler | disler/claude-code-hooks-mastery |
| Block Dangerous Commands | security | PreToolUse | disler | disler/claude-code-hooks-mastery |
| Prompt Injection Guard | security | UserPromptSubmit | lasso-security | lasso-security/claude-hooks |
| Auto-format on Edit | code-quality | PostToolUse | disler | disler/claude-code-hooks-mastery |
| Run Tests After Write | code-quality | PostToolUse | karanb192 | karanb192/claude-code-hooks |
| TDD Enforcer | workflow-automation | PostToolUse | disler | disler/claude-code-hooks-mastery |
| Git Checkpoint | workflow-automation | PreToolUse | karanb192 | karanb192/claude-code-hooks |
| Audio Alert on Stop | notifications | Stop | disler | disler/claude-code-hooks-mastery |
| Slack Notification | notifications | Stop | ChrisWiles | ChrisWiles/claude-code-showcase |
| Auto-load Context | context-management | SessionStart | disler | disler/claude-code-hooks-mastery |
| Context Warning | context-management | PreCompact | disler | disler/claude-code-hooks-mastery |
| Event Logger | context-management | PostToolUse | disler | disler/claude-code-hooks-multi-agent-observability |

---

## Non-Goals (out of MVP scope)

- User authentication or accounts
- Hook submission form
- Full-text search
- Star ratings or upvotes
- Pagination
- Hook detail/single pages
- Database or CMS integration

---

## Verification Checklist

1. `npm run dev` → open `http://localhost:3000`
2. Grid renders all seed hooks
3. Category filter pills filter the grid correctly
4. "All" pill restores the full grid
5. "View on GitHub" opens the correct repo URL in a new tab
6. Responsive: 1 / 2 / 3 column layout at mobile / tablet / desktop
7. Dark mode applies correctly when OS preference is toggled
8. `npm run build` completes without errors
