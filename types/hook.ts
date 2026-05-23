export type HookCategory =
  | 'security'
  | 'code-quality'
  | 'notifications'
  | 'context-management'
  | 'workflow-automation'

export type HookEventType =
  | 'PreToolUse'
  | 'PostToolUse'
  | 'SessionStart'
  | 'SessionEnd'
  | 'Stop'
  | 'UserPromptSubmit'
  | 'PreCompact'
  | 'Notification'
  | 'other'

export type Hook = {
  id: string
  name: string
  category: HookCategory
  eventType: HookEventType
  description: string
  repoUrl: string
  author: string
}

export const CATEGORY_META: Record<HookCategory, { label: string; badgeClass: string; activeClass: string }> = {
  'security': {
    label: 'Security',
    badgeClass: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    activeClass: 'bg-red-600 text-white dark:bg-red-500',
  },
  'code-quality': {
    label: 'Code Quality',
    badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    activeClass: 'bg-blue-600 text-white dark:bg-blue-500',
  },
  'notifications': {
    label: 'Notifications',
    badgeClass: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    activeClass: 'bg-yellow-500 text-white dark:bg-yellow-400',
  },
  'context-management': {
    label: 'Context Management',
    badgeClass: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    activeClass: 'bg-purple-600 text-white dark:bg-purple-500',
  },
  'workflow-automation': {
    label: 'Workflow Automation',
    badgeClass: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    activeClass: 'bg-green-600 text-white dark:bg-green-500',
  },
}
