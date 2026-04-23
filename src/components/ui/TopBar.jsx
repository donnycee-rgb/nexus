import { Bell } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store'

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/compose': 'Compose',
  '/posts': 'Posts',
  '/analytics': 'Analytics',
  '/inbox': 'Inbox',
  '/notifications': 'Notifications',
  '/scheduler': 'Scheduler',
  '/platforms': 'Platforms',
  '/admin': 'Admin',
  '/settings': 'Settings',
}

const getInitials = (name) => {
  const clean = String(name ?? '').trim()
  if (!clean) {
    return 'U'
  }

  const parts = clean.split(/\s+/).slice(0, 2)
  return parts
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

export default function TopBar() {
  const { pathname } = useLocation()
  const title = PAGE_TITLES[pathname] ?? 'NEXUS'
  const user = useAuthStore((state) => state.user)
  const activeWorkspace = useAuthStore((state) => state.activeWorkspace)

  return (
    <header
      className="flex h-14 items-center border-b px-4 sm:px-6 lg:px-8"
      style={{
        borderColor: 'var(--bg-border)',
        backgroundColor: 'var(--bg-surface)',
      }}
    >
      <div className="min-w-0 flex-1">
        <h1
          className="truncate text-base font-bold sm:text-lg"
          style={{
            color: 'var(--text-primary)',
            fontFamily: '"Cabinet Grotesk", var(--font-display)',
          }}
        >
          {title}
        </h1>
        {activeWorkspace ? (
          <p
            className="truncate text-[11px] uppercase tracking-[0.06em]"
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {activeWorkspace.company}
          </p>
        ) : null}
      </div>

      <div className="ml-4 flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-[10px] border p-2 transition"
          style={{
            borderColor: 'var(--bg-border)',
            backgroundColor: 'var(--bg-overlay)',
            color: 'var(--text-muted)',
          }}
        >
          <Bell size={16} />
          <span
            className="absolute right-1 top-1 size-2 rounded-full"
            style={{ backgroundColor: 'var(--danger)' }}
          />
        </button>

        <div
          className="grid size-8 place-items-center rounded-full text-xs font-semibold"
          style={{
            border: '1px solid var(--accent-border)',
            backgroundColor: 'var(--accent-dim-md)',
            color: 'var(--accent)',
          }}
        >
          {getInitials(user?.name)}
        </div>
      </div>
    </header>
  )
}
