'use client'

import { HookCategory, CATEGORY_META } from '@/types/hook'

type ActiveCategory = HookCategory | 'all'

type Props = {
  activeCategory: ActiveCategory
  onSelect: (category: ActiveCategory) => void
}

const CATEGORIES = Object.keys(CATEGORY_META) as HookCategory[]

const CategoryFilter = ({ activeCategory, onSelect }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent, category: ActiveCategory) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(category)
    }
  }

  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="flex flex-wrap gap-2"
    >
      <button
        onClick={() => onSelect('all')}
        onKeyDown={(e) => handleKeyDown(e, 'all')}
        aria-pressed={activeCategory === 'all'}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 ${
          activeCategory === 'all'
            ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
            : 'border border-black/[.08] text-zinc-600 hover:bg-zinc-100 dark:border-white/[.08] dark:text-zinc-400 dark:hover:bg-zinc-800'
        }`}
      >
        All
      </button>

      {CATEGORIES.map((category) => {
        const { label, activeClass } = CATEGORY_META[category]
        const isActive = activeCategory === category

        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            onKeyDown={(e) => handleKeyDown(e, category)}
            aria-pressed={isActive}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 ${
              isActive
                ? activeClass
                : 'border border-black/[.08] text-zinc-600 hover:bg-zinc-100 dark:border-white/[.08] dark:text-zinc-400 dark:hover:bg-zinc-800'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryFilter
