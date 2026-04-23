import { NavLink } from 'react-router-dom'
import { Grid2X2, LayoutDashboard, MessageSquare, PenSquare, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/compose', label: 'Compose', icon: PenSquare },
  { to: '/posts', label: 'Posts', icon: Grid2X2 },
  { to: '/inbox', label: 'Inbox', icon: MessageSquare },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t px-2 py-2 lg:hidden"
      style={{
        borderColor: 'var(--bg-border)',
        backgroundColor: 'var(--bg-surface)',
      }}
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className="flex w-full flex-col items-center justify-center gap-1 rounded-[10px] px-2 py-1.5 text-[11px] font-medium transition"
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                backgroundColor: isActive ? 'var(--accent-dim)' : 'transparent',
              })}
            >
              <Icon size={15} />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
