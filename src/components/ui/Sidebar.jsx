import { useMemo, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BarChart2,
  Bell,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  PenSquare,
  Plug,
  Settings,
  ShieldCheck,
  Skull,
  Zap,
} from 'lucide-react'
import { useAuthStore } from '@/features/auth/store'
import { useToastStore } from '@/store/toastStore'

const EXPANDED_WIDTH = 220
const COLLAPSED_WIDTH = 64

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/compose', icon: PenSquare, label: 'Compose' },
  { to: '/posts', icon: Grid2X2, label: 'Posts' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/inbox', icon: MessageSquare, label: 'Inbox' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/scheduler', icon: CalendarClock, label: 'Scheduler' },
  { to: '/platforms', icon: Plug, label: 'Platforms' },
  { to: '/admin', icon: ShieldCheck, label: 'Admin' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [killSwitchEnabled, setKillSwitchEnabled] = useState(false)

  const activeWorkspace = useAuthStore((state) => state.activeWorkspace)
  const logout = useAuthStore((state) => state.logout)
  const pushWarningToast = useToastStore((state) => state.warning)
  const pushInfoToast = useToastStore((state) => state.info)

  const links = useMemo(() => {
    const role = activeWorkspace?.role ?? 'member'
    if (role === 'admin') {
      return NAV_ITEMS
    }

    return NAV_ITEMS.filter((item) => item.to !== '/admin')
  }, [activeWorkspace?.role])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const handleKillSwitch = () => {
    const nextState = !killSwitchEnabled
    setKillSwitchEnabled(nextState)

    if (nextState) {
      pushWarningToast('Emergency stop engaged (mock). Scheduled actions are paused.', {
        title: 'Kill Switch ON',
      })
      return
    }

    pushInfoToast('Emergency stop released.', {
      title: 'Kill Switch OFF',
    })
  }

  const initials = activeWorkspace?.initials ?? 'WS'

  return (
    <motion.aside
      animate={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
      initial={false}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="z-30 flex h-screen min-w-0 flex-col overflow-hidden border-r"
      style={{
        borderColor: 'var(--bg-border)',
        backgroundColor: 'var(--bg-surface)',
      }}
    >
      <div
        className="flex h-14 items-center gap-2 border-b px-3"
        style={{ borderColor: 'var(--bg-border)' }}
      >
        <div
          className="grid size-8 place-items-center rounded-[8px] text-xs font-bold"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--text-inverse)',
          }}
        >
          <Zap size={14} />
        </div>
        {!collapsed ? (
          <span
            className="truncate text-base font-semibold tracking-[0.08em]"
            style={{
              color: 'var(--text-primary)',
              fontFamily: '"Cabinet Grotesk", var(--font-display)',
            }}
          >
            NEXUS
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="ml-auto rounded-[8px] p-1"
          style={{ color: 'var(--text-muted)' }}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className="mb-1 flex items-center gap-2 rounded-[10px] px-2.5 py-2 text-[13px] transition"
            style={({ isActive }) => ({
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--accent-dim)' : 'transparent',
              fontWeight: isActive ? 600 : 500,
              justifyContent: collapsed ? 'center' : 'flex-start',
            })}
          >
            <Icon size={16} />
            {!collapsed ? <span className="truncate">{label}</span> : null}
          </NavLink>
        ))}
      </nav>

      <div
        className="border-t px-2 pb-3 pt-2"
        style={{ borderColor: 'var(--bg-border)' }}
      >
        <button
          type="button"
          onClick={() => navigate('/workspace')}
          className="mb-2 flex w-full items-center gap-2 rounded-[10px] border px-2 py-2 text-left transition"
          style={{
            borderColor: 'var(--bg-border)',
            backgroundColor: 'var(--bg-overlay)',
          }}
        >
          <div
            className="grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-bold"
            style={{
              backgroundColor: activeWorkspace?.color ?? 'var(--accent)',
              color: 'white',
            }}
          >
            {initials}
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <p
                className="truncate text-xs font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {activeWorkspace?.company ?? 'Select workspace'}
              </p>
              <p
                className="truncate text-[10px] uppercase"
                style={{
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {activeWorkspace?.role ?? 'workspace'}
              </p>
            </div>
          ) : null}
        </button>

        <button
          type="button"
          onClick={handleKillSwitch}
          className="mb-1 flex w-full items-center gap-2 rounded-[10px] px-2.5 py-2 text-[13px] font-semibold transition"
          style={{
            color: 'var(--danger)',
            backgroundColor: killSwitchEnabled ? 'var(--danger-dim)' : 'transparent',
          }}
        >
          <Skull size={16} />
          {!collapsed ? <span>Kill Switch</span> : null}
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-[10px] px-2.5 py-2 text-[13px] transition"
          style={{ color: 'var(--text-secondary)' }}
        >
          <LogOut size={16} />
          {!collapsed ? <span>Logout</span> : null}
        </button>
      </div>
    </motion.aside>
  )
}
