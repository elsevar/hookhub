import hooksData from '@/data/hooks.json'
import { Hook } from '@/types/hook'
import HookBrowser from '@/components/HookBrowser'

const hooks = hooksData as Hook[]

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          HookHub
        </h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400">
          Discover open-source Claude Code hooks from the community.
        </p>
      </div>

      <HookBrowser hooks={hooks} />
    </main>
  )
}
