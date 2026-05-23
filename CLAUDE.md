# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server (Turbopack, outputs to `.next/dev`)
- `npm run build` — production build (Turbopack by default; pass `--webpack` to opt out)
- `npm run start` — start production server
- `npm run lint` — run ESLint directly (`next lint` was removed in v16; `next build` no longer lints automatically)

## Architecture

Next.js 16 App Router project with React 19.2, TypeScript strict mode, and Tailwind CSS v4.

- `app/` — file-system routing; `layout.tsx` is the root layout, `page.tsx` files define routes; components are Server Components by default
- `public/` — static assets served from `/`
- `next.config.ts` — Next.js configuration
- `eslint.config.mjs` — ESLint flat config (v9 format, not legacy `.eslintrc`)

Import alias: `@/*` resolves to the project root (`./`).

## Next.js 16 Breaking Changes

These diverge silently from pre-v16 patterns. Always check `node_modules/next/dist/docs/` for the current API before writing code.

**Async Request APIs** — `cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` in pages/layouts/routes are now Promises. Always `await` them:

```tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
}
```

Run `npx next typegen` to generate `PageProps`/`LayoutProps`/`RouteContext` helpers for type-safe access.

**`middleware` → `proxy`** — rename `middleware.ts` to `proxy.ts`; rename the named export `middleware` to `proxy`. The `edge` runtime is not supported in `proxy` (Node.js only). The config flag `skipMiddlewareUrlNormalize` is now `skipProxyUrlNormalize`.

**Turbopack is the default bundler** — no `--turbopack` flag needed. A custom `webpack` config in `next.config.ts` will cause `next build` to fail unless `--webpack` is passed. Turbopack config moved from `experimental.turbopack` to top-level `turbopack`.

**`revalidateTag` requires a second argument** — pass a `cacheLife` profile: `revalidateTag('posts', 'max')`. For immediate invalidation (read-your-writes), use `updateTag` inside Server Actions instead.

**`cacheLife` and `cacheTag`** — `unstable_` prefix removed; import directly: `import { cacheLife, cacheTag } from 'next/cache'`.

**Partial Prerendering** — `experimental.ppr` and the `experimental_ppr` route segment config are removed. Use top-level `cacheComponents: true` in `next.config.ts` instead.

**Parallel routes** — every `@slot` directory requires an explicit `default.js`/`default.tsx` file; builds fail without them.

**`next/legacy/image` removed** — use `next/image`.

**`images.domains` deprecated** — use `images.remotePatterns`.

**`serverRuntimeConfig`/`publicRuntimeConfig` removed** — use `process.env` directly in Server Components; prefix client-accessible vars with `NEXT_PUBLIC_`. To force runtime (not build-time) env reads, call `await connection()` from `next/server` first.

**AMP removed** — `next/amp` and `export const config = { amp: true }` no longer exist.

**React Compiler** (optional) — stable in v16; enable with `reactCompiler: true` in `next.config.ts` after installing `babel-plugin-react-compiler`.
