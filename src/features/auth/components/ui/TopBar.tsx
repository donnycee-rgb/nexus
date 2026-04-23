import { useLocation } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useAuthStore } from '@/features/auth/store'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard':     'Dashboard',
  '/compose':       'Compose',
  '/posts':         'Posts',
  '/analytics':     'Analytics',
  '/inbox':         'Inbox',
  '/notifications': 'Notifications',
  '/scheduler':     'Scheduler',
  '/platforms':     'Platforms',
  '/admin':         'Admin',
  '/settings':      'Settings',
}

export default function TopBar() {
  const { pathname } = useLocation()
  const { user, activeWorkspace } = useAuthStore()
  const title = PAGE_TITLES[pathname] ?? 'NEXUS'

  return (
    <header style={{
      height: '56px',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--bg-border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: '16px',
      flexShrink: 0,
    }}>
      {/* Page title */}
      <div style={{ flex: 1 }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          margin: 0,
        }}>{title}</h1>
        {activeWorkspace && (
          <p style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            margin: 0,
            fontFamily: 'var(--font-mono)',
          }}>
            {activeWorkspace.company}
          </p>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Notifications bell */}
        <button style={{
          position: 'relative',
          color: 'var(--text-muted)',
          padding: '6px',
          borderRadius: 'var(--radius-md)',
          display: 'flex', alignItems: 'center',
          transition: 'color var(--transition-fast)',
        }}>
          <Bell size={18} />
          <span style={{
            position: 'absolute', top: '4px', right: '4px',
            width: '7px', height: '7px',
            backgroundColor: 'var(--danger)',
            borderRadius: '50%',
          }} />
        </button>

        {/* User avatar */}
        <div style={{
          width: '32px', height: '32px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-dim-md)',
          border: '1.5px solid var(--accent-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '12px', fontWeight: 700,
          color: 'var(--accent)',
          cursor: 'pointer',
        }}>
          {user?.name?.charAt(0).toUpperCase() ?? 'U'}
        </div>
      </div>
    </header>
  )
}