import { Hook, CATEGORY_META } from '@/types/hook'

type Props = {
  hook: Hook
}

const HookCard = ({ hook }: Props) => {
  const { label, badgeClass } = CATEGORY_META[hook.category]

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-black/[.08] bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-white/[.08] dark:bg-zinc-900">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          {hook.name}
        </h2>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
        >
          {label}
        </span>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {hook.description}
      </p>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="rounded bg-zinc-100 px-2 py-0.5 font-mono dark:bg-zinc-800">
            {hook.eventType}
          </span>
          <span>by {hook.author}</span>
        </div>

        <a
          href={hook.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          aria-label={`View ${hook.name} on GitHub`}
          className="shrink-0 rounded-full border border-black/[.08] px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:border-transparent hover:bg-zinc-100 dark:border-white/[.08] dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          View on GitHub
        </a>
      </div>
    </article>
  )
}

export default HookCard
