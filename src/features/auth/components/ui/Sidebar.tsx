import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, PenSquare, Grid2X2, BarChart2,
  MessageSquare, Bell, CalendarClock, Plug, ShieldCheck,
  Settings, ChevronLeft, ChevronRight, LogOut, Zap, Moon, Sun,
} from 'lucide-react'
import { useAuthStore } from '@/features/auth/store'

const NAV = [
  { to: '/dashboard',     icon: LayoutDashboard, label: 'Dashboard'     },
  { to: '/compose',       icon: PenSquare,        label: 'Compose'       },
  { to: '/posts',         icon: Grid2X2,          label: 'Posts'         },
  { to: '/analytics',     icon: BarChart2,        label: 'Analytics'     },
  { to: '/inbox',         icon: MessageSquare,    label: 'Inbox'         },
  { to: '/notifications', icon: Bell,             label: 'Notifications' },
  { to: '/scheduler',     icon: CalendarClock,    label: 'Scheduler'     },
  { to: '/platforms',     icon: Plug,             label: 'Platforms'     },
  { to: '/admin',         icon: ShieldCheck,      label: 'Admin'         },
  { to: '/settings',      icon: Settings,         label: 'Settings'      },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  theme: 'dark' | 'light'
  setTheme: (t: 'dark' | 'light') => void
}

export default function Sidebar({ collapsed, onToggle, theme, setTheme }: SidebarProps) {
  const { activeWorkspace, logout } = useAuthStore()
  const navigate = useNavigate()
  const w = collapsed ? '64px' : '220px'

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <aside style={{
      width: w,
      minWidth: w,
      height: '100vh',
      backgroundColor: 'var(--bg-surface)',
      borderRight: '1px solid var(--bg-border)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width var(--transition-slow)',
      overflow: 'hidden',
      zIndex: 50,
    }}>

      {/* Logo */}
      <div style={{
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        borderBottom: '1px solid var(--bg-border)',
        gap: '10px',
        flexShrink: 0,
      }}>
        <div style={{
          width: '28px', height: '28px', minWidth: '28px',
          backgroundColor: 'var(--accent)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Zap size={14} color="white" />
        </div>
        {!collapsed && (
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '16px', fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap',
          }}>NEXUS</span>
        )}
        <button onClick={onToggle} style={{
          marginLeft: 'auto',
          color: 'var(--text-muted)',
          display: 'flex', alignItems: 'center',
          padding: '4px',
          borderRadius: 'var(--radius-sm)',
          transition: 'color var(--transition-fast)',
        }}>
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Workspace */}
      {activeWorkspace && (
        <div style={{
          padding: '12px',
          borderBottom: '1px solid var(--bg-border)',
          flexShrink: 0,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '8px', borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-overlay)',
          }}>
            <div style={{
              width: '28px', height: '28px', minWidth: '28px',
              borderRadius: '50%',
              backgroundColor: activeWorkspace.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', fontWeight: 700, color: 'white',
            }}>
              {activeWorkspace.initials}
            </div>
            {!collapsed && (
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: '12px', fontWeight: 600,
                  color: 'var(--text-primary)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {activeWorkspace.company}
                </div>
                <div style={{
                  fontSize: '10px', color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                }}>
                  {activeWorkspace.role}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px', overflowY: 'auto' }}>
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center',
            gap: '10px', padding: '9px 10px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '2px',
            textDecoration: 'none',
            color: isActive ? 'var(--accent)' : 'var(--text-muted)',
            backgroundColor: isActive ? 'var(--accent-dim)' : 'transparent',
            transition: 'all var(--transition-fast)',
            fontWeight: isActive ? 600 : 400,
            fontSize: '13px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          })}>
            <Icon size={16} style={{ minWidth: '16px' }} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div style={{
        padding: '12px',
        borderTop: '1px solid var(--bg-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flexShrink: 0,
      }}>
        {/* Theme toggle */}
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '8px 10px', borderRadius: 'var(--radius-md)',
            color: 'var(--text-muted)', fontSize: '13px',
            transition: 'all var(--transition-fast)',
            whiteSpace: 'nowrap', overflow: 'hidden',
          }}>
          {theme === 'dark'
            ? <Sun size={16} style={{ minWidth: '16px' }} />
            : <Moon size={16} style={{ minWidth: '16px' }} />
          }
          {!collapsed && <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>}
        </button>

        {/* Logout */}
        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '8px 10px', borderRadius: 'var(--radius-md)',
          color: 'var(--danger)', fontSize: '13px',
          transition: 'all var(--transition-fast)',
          whiteSpace: 'nowrap', overflow: 'hidden',
        }}>
          <LogOut size={16} style={{ minWidth: '16px' }} />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  )
}