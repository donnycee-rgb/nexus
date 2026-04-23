import { Outlet } from 'react-router-dom'

export default function AuthShell() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="w-full max-w-md">
        <div className="mb-10 flex items-center justify-center gap-3">
          <div
            className="grid size-10 place-items-center rounded-[10px] text-xl font-bold shadow-sm"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--text-inverse)',
            }}
          >
            ⚡
          </div>
          <span
            className="text-3xl font-semibold tracking-[0.08em]"
            style={{
              color: 'var(--text-primary)',
              fontFamily: '"Cabinet Grotesk", var(--font-display)',
            }}
          >
            NEXUS
          </span>
        </div>

        <Outlet />
      </div>
    </div>
  )
}
