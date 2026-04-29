import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import './css/style.css';
import './charts/ChartjsConfig';

import { useAuthStore } from './features/auth/store';

// Pages
import Dashboard    from './pages/Dashboard';
import LoginPage    from './pages/LoginPage';
import TwoFAPage    from './pages/TwoFAPage';
import WorkspacePage from './pages/WorkspacePage';
import ComposerPage  from './pages/ComposerPage';
import PostsPage     from './pages/PostsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import InboxPage     from './pages/InboxPage';
import NotificationsPage from './pages/NotificationsPage';
import SchedulerPage from './pages/SchedulerPage';
import PlatformsPage from './pages/PlatformsPage';
import AdminPage     from './pages/AdminPage';
import SettingsPage  from './pages/SettingsPage';
import KillSwitchPage from './pages/KillSwitchPage';

// ── Guards ─────────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { isAuthenticated, twoFAVerified, hasWorkspace } = useAuthStore();
  if (!isAuthenticated)   return <Navigate to="/login"     replace />;
  if (!twoFAVerified)     return <Navigate to="/verify"    replace />;
  if (!hasWorkspace)      return <Navigate to="/workspace" replace />;
  return children;
}

function AuthRoute({ children }) {
  const { isAuthenticated, twoFAVerified, hasWorkspace } = useAuthStore();
  if (isAuthenticated && twoFAVerified && hasWorkspace)
    return <Navigate to="/" replace />;
  return children;
}

// ── App ────────────────────────────────────────────────────────
function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login"     element={<AuthRoute><LoginPage /></AuthRoute>} />
      <Route path="/verify"    element={<TwoFAPage />} />
      <Route path="/workspace" element={<WorkspacePage />} />
      <Route path="/kill"      element={<KillSwitchPage />} />

      {/* Protected app routes */}
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/compose"       element={<ProtectedRoute><ComposerPage /></ProtectedRoute>} />
      <Route path="/posts"         element={<ProtectedRoute><PostsPage /></ProtectedRoute>} />
      <Route path="/analytics"     element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
      <Route path="/inbox"         element={<ProtectedRoute><InboxPage /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
      <Route path="/scheduler"     element={<ProtectedRoute><SchedulerPage /></ProtectedRoute>} />
      <Route path="/platforms"     element={<ProtectedRoute><PlatformsPage /></ProtectedRoute>} />
      <Route path="/admin"         element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
      <Route path="/settings"      element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;