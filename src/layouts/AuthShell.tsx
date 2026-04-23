import { Outlet } from 'react-router-dom'

export default function AuthShell() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-base)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '40px',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            backgroundColor: 'var(--accent)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}>⚡</div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '0.05em',
          }}>NEXUS</span>
        </div>

        {/* Page content */}
        <Outlet />
      </div>
    </div>
  )
}