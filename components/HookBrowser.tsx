'use client'

import { useState } from 'react'
import { Hook, HookCategory } from '@/types/hook'
import CategoryFilter from './CategoryFilter'
import HookGrid from './HookGrid'

type ActiveCategory = HookCategory | 'all'

type Props = {
  hooks: Hook[]
}

const HookBrowser = ({ hooks }: Props) => {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all')

  const filtered = activeCategory === 'all'
    ? hooks
    : hooks.filter((h) => h.category === activeCategory)

  return (
    <div className="flex flex-col gap-6">
      <CategoryFilter activeCategory={activeCategory} onSelect={setActiveCategory} />
      <HookGrid hooks={filtered} />
    </div>
  )
}

export default HookBrowser
