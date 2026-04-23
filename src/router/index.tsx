import { Routes, Route, Navigate } from 'react-router-dom'
import AuthShell from '@/layouts/AuthShell'
import AppShell from '@/layouts/AppShell'
import LoginPage from '@/pages/LoginPage'
import TwoFAPage from '@/pages/TwoFAPage'
import WorkspacePage from '@/pages/WorkspacePage'
import DashboardPage from '@/pages/DashboardPage'
import ComposerPage from '@/pages/ComposerPage'
import PostsPage from '@/pages/PostsPage'
import AnalyticsPage from '@/pages/AnalyticsPage'
import InboxPage from '@/pages/InboxPage'
import NotificationsPage from '@/pages/NotificationsPage'
import SchedulerPage from '@/pages/SchedulerPage'
import PlatformsPage from '@/pages/PlatformsPage'
import AdminPage from '@/pages/AdminPage'
import SettingsPage from '@/pages/SettingsPage'
import { useAuthStore } from '@/features/auth/store'

interface AppRouterProps {
  theme: 'dark' | 'light'
  setTheme: (t: 'dark' | 'light') => void
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hasWorkspace } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!hasWorkspace) return <Navigate to="/workspace" replace />
  return <>{children}</>
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

export default function AppRouter({ theme, setTheme }: AppRouterProps) {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthShell />}>
        <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
        <Route path="/verify" element={<TwoFAPage />} />
      </Route>

      {/* Workspace selection */}
      <Route path="/workspace" element={<WorkspacePage />} />

      {/* App routes */}
      <Route element={
        <ProtectedRoute>
          <AppShell theme={theme} setTheme={setTheme} />
        </ProtectedRoute>
      }>
        <Route path="/dashboard"     element={<DashboardPage />} />
        <Route path="/compose"       element={<ComposerPage />} />
        <Route path="/posts"         element={<PostsPage />} />
        <Route path="/analytics"     element={<AnalyticsPage />} />
        <Route path="/inbox"         element={<InboxPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/scheduler"     element={<SchedulerPage />} />
        <Route path="/platforms"     element={<PlatformsPage />} />
        <Route path="/admin"         element={<AdminPage />} />
        <Route path="/settings"      element={<SettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}