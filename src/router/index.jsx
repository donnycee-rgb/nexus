import { Navigate, Route, Routes } from 'react-router-dom'
import AuthShell from '@/layouts/AuthShell'
import AppShell from '@/layouts/AppShell'
import LoginPage from '@/pages/LoginPage'
import TwoFAPage from '@/pages/TwoFAPage'
import WorkspacePage from '@/pages/WorkspacePage'
import DashboardPage from '@/pages/DashboardPage.jsx'
import ComposerPage from '@/pages/ComposerPage'
import PostsPage from '@/pages/PostsPage'
import AnalyticsPage from '@/pages/AnalyticsPage.jsx'
import InboxPage from '@/pages/InboxPage'
import NotificationsPage from '@/pages/NotificationsPage'
import SchedulerPage from '@/pages/SchedulerPage'
import PlatformsPage from '@/pages/PlatformsPage'
import AdminPage from '@/pages/AdminPage'
import SettingsPage from '@/pages/SettingsPage'
import { useAuthStore } from '@/features/auth/store'

const nextPrivateRoute = ({ isAuthenticated, twoFAVerified, hasWorkspace }) => {
  if (!isAuthenticated) {
    return '/login'
  }

  if (!twoFAVerified) {
    return '/verify'
  }

  if (!hasWorkspace) {
    return '/workspace'
  }

  return '/dashboard'
}

function useAuthRouteState() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const twoFAVerified = useAuthStore((state) => state.twoFAVerified)
  const hasWorkspace = useAuthStore(
    (state) => state.hasWorkspace || Boolean(state.activeWorkspace?.id),
  )

  return {
    isAuthenticated,
    twoFAVerified,
    hasWorkspace,
  }
}

function RootRedirect() {
  const authState = useAuthRouteState()
  return <Navigate to={nextPrivateRoute(authState)} replace />
}

function GuestRoute({ children }) {
  const authState = useAuthRouteState()
  if (!authState.isAuthenticated) {
    return children
  }

  return <Navigate to={nextPrivateRoute(authState)} replace />
}

function TwoFARoute({ children }) {
  const authState = useAuthRouteState()
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (authState.twoFAVerified) {
    return <Navigate to={authState.hasWorkspace ? '/dashboard' : '/workspace'} replace />
  }

  return children
}

function WorkspaceSelectionRoute({ children }) {
  const authState = useAuthRouteState()
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!authState.twoFAVerified) {
    return <Navigate to="/verify" replace />
  }

  if (authState.hasWorkspace) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

function ProtectedRoute({ children }) {
  const authState = useAuthRouteState()
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!authState.twoFAVerified) {
    return <Navigate to="/verify" replace />
  }

  if (!authState.hasWorkspace) {
    return <Navigate to="/workspace" replace />
  }

  return children
}

export default function AppRouter({ theme, setTheme }) {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route element={<AuthShell />}>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/verify"
          element={
            <TwoFARoute>
              <TwoFAPage />
            </TwoFARoute>
          }
        />
      </Route>

      <Route
        path="/workspace"
        element={
          <WorkspaceSelectionRoute>
            <WorkspacePage />
          </WorkspaceSelectionRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <AppShell theme={theme} setTheme={setTheme} />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/compose" element={<ComposerPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/scheduler" element={<SchedulerPage />} />
        <Route path="/platforms" element={<PlatformsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<RootRedirect />} />
    </Routes>
  )
}
