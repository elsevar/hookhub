import { Hook } from '@/types/hook'
import HookCard from './HookCard'

type Props = {
  hooks: Hook[]
}

const HookGrid = ({ hooks }: Props) => {
  if (hooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-zinc-400 dark:text-zinc-600">
        <p className="text-lg font-medium">No hooks found</p>
        <p className="mt-1 text-sm">Try selecting a different category.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {hooks.map((hook) => (
        <HookCard key={hook.id} hook={hook} />
      ))}
    </div>
  )
}

export default HookGrid
