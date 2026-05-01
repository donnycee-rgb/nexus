import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { useAuthStore } from '../features/auth/store';
import { MESSAGES_BY_WORKSPACE, NOTIFICATIONS_BY_WORKSPACE } from '../utils/mockData';

function Sidebar({ sidebarOpen, setSidebarOpen, variant = 'default' }) {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { pathname } = location;
  const trigger   = useRef(null);
  const sidebar   = useRef(null);

  const storedExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedExpanded === null ? false : storedExpanded === 'true'
  );

  const { activeWorkspace, workspaces, setWorkspace, logout, user } = useAuthStore();

  const workspaceId         = activeWorkspace?.id ?? '';
  const messages            = MESSAGES_BY_WORKSPACE[workspaceId] ?? [];
  const notifications       = NOTIFICATIONS_BY_WORKSPACE[workspaceId] ?? [];
  const unreadMessages      = messages.reduce((t, m) => t + (m.unreadCount ?? 0), 0);
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  });

  useEffect(() => {
    const handler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  function handleLogout() { logout(); navigate('/login', { replace: true }); }
  function handleKillSwitch() { logout(); navigate('/kill', { replace: true }); }

  // Simple flat nav link
  function NavItem({ to, icon, label, badge, exact = false }) {
    const isActive = exact ? pathname === to : pathname === to || pathname.startsWith(to + '/');
    return (
      <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${isActive ? 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]' : ''}`}>
        <NavLink end={exact} to={to}
          className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${isActive ? '' : 'hover:text-gray-900 dark:hover:text-white'}`}
        >
          <div className="flex items-center justify-between">
            <div className="grow flex items-center">
              <span className={`shrink-0 fill-current ${isActive ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`}>
                {icon}
              </span>
              <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                {label}
              </span>
            </div>
            {badge > 0 && (
              <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-violet-500 px-2 rounded-full shrink-0 ml-2">
                {badge}
              </span>
            )}
          </div>
        </NavLink>
      </li>
    );
  }

  // Sub-link inside a dropdown
  function SubLink({ to, label }) {
    return (
      <li className="mb-1 last:mb-0">
        <NavLink end to={to}
          className={({ isActive }) =>
            'block transition duration-150 truncate ' +
            (isActive ? 'text-violet-500' : 'text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200')
          }
        >
          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
            {label}
          </span>
        </NavLink>
      </li>
    );
  }

  return (
    <div className="min-w-fit">
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64! shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'rounded-r-2xl shadow-xs'}`}
      >

        {/* Logo */}
        <div className="flex justify-between mb-6 pr-3 sm:px-2">
          <button ref={trigger} className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)} aria-controls="sidebar">
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"/>
            </svg>
          </button>
          <NavLink end to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-violet-500 shrink-0">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
                <path d="M13 2L5 14h4l-1 6 9-10h-4l1-8z"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-wide lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
              NEXUS
            </span>
          </NavLink>
        </div>

        {/* New post CTA */}
        <div className="mb-4">
          <NavLink to="/compose"
            className="btn w-full bg-violet-500 hover:bg-violet-600 text-white flex items-center justify-center gap-2">
            <svg className="fill-current shrink-0" width="14" height="14" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"/>
            </svg>
            <span className="lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">New Post</span>
          </NavLink>
        </div>

        {/* Nav */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Navigation</span>
            </h3>

            <ul className="mt-3">

              {/* Dashboard — flat */}
              <NavItem exact to="/" label="Dashboard" icon={
                <svg width="16" height="16" viewBox="0 0 16 16" className="fill-current">
                  <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z"/>
                  <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z"/>
                </svg>
              } />

              {/* Content group — Compose, Posts, Scheduler */}
              <SidebarLinkGroup activecondition={
                pathname.includes('compose') || pathname.includes('posts') || pathname.includes('scheduler')
              }>
                {(handleClick, open) => (
                  <React.Fragment>
                    <a href="#0"
                      className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                        pathname.includes('compose') || pathname.includes('posts') || pathname.includes('scheduler')
                          ? '' : 'hover:text-gray-900 dark:hover:text-white'
                      }`}
                      onClick={(e) => { e.preventDefault(); handleClick(); setSidebarExpanded(true); }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className={`shrink-0 fill-current ${pathname.includes('compose') || pathname.includes('posts') || pathname.includes('scheduler') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} width="16" height="16" viewBox="0 0 16 16">
                            <path d="M13.95.879a3 3 0 0 0-4.243 0L1.293 9.293a1 1 0 0 0-.274.51l-1 5a1 1 0 0 0 1.177 1.177l5-1a1 1 0 0 0 .511-.273l8.414-8.414a3 3 0 0 0 0-4.242L13.95.879ZM11.12 2.293a1 1 0 0 1 1.414 0l1.172 1.172a1 1 0 0 1 0 1.414l-8.2 8.2-3.232.646.646-3.232 8.2-8.2Z"/>
                          </svg>
                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Content</span>
                        </div>
                        <svg className={`w-3 h-3 shrink-0 ml-2 fill-current text-gray-400 dark:text-gray-500 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
                        </svg>
                      </div>
                    </a>
                    <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                      <ul className={`pl-8 mt-1 ${!open && 'hidden'}`}>
                        <SubLink to="/compose"   label="Compose" />
                        <SubLink to="/posts"     label="All Posts" />
                        <SubLink to="/scheduler" label="Scheduler" />
                      </ul>
                    </div>
                  </React.Fragment>
                )}
              </SidebarLinkGroup>

              {/* Analytics — flat */}
              <NavItem to="/analytics" label="Analytics" icon={
                <svg width="16" height="16" viewBox="0 0 16 16" className="fill-current">
                  <path d="M1 11h3v3H1zM6 7h3v7H6zM11 4h3v10h-3zM1 4l2-3 3 2 3-3 3 2V3l-3-2-3 3-3-2-2 3z"/>
                </svg>
              } />

              {/* Engage group — Inbox, Notifications */}
              <SidebarLinkGroup activecondition={pathname.includes('inbox') || pathname.includes('notifications')}>
                {(handleClick, open) => (
                  <React.Fragment>
                    <a href="#0"
                      className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                        pathname.includes('inbox') || pathname.includes('notifications')
                          ? '' : 'hover:text-gray-900 dark:hover:text-white'
                      }`}
                      onClick={(e) => { e.preventDefault(); handleClick(); setSidebarExpanded(true); }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className={`shrink-0 fill-current ${pathname.includes('inbox') || pathname.includes('notifications') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} width="16" height="16" viewBox="0 0 16 16">
                            <path d="M14 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3l3 3 3-3h3a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1ZM5 7h6v1H5V7Zm0-2h6v1H5V5Z"/>
                          </svg>
                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Engage</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          {(unreadMessages + unreadNotifications) > 0 && (
                            <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-violet-500 px-2 rounded-full">
                              {unreadMessages + unreadNotifications}
                            </span>
                          )}
                          <svg className={`w-3 h-3 fill-current text-gray-400 dark:text-gray-500 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
                          </svg>
                        </div>
                      </div>
                    </a>
                    <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                      <ul className={`pl-8 mt-1 ${!open && 'hidden'}`}>
                        <li className="mb-1 last:mb-0">
                          <NavLink end to="/inbox"
                            className={({ isActive }) =>
                              'flex items-center justify-between transition duration-150 truncate ' +
                              (isActive ? 'text-violet-500' : 'text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200')
                            }
                          >
                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Inbox</span>
                            {unreadMessages > 0 && (
                              <span className="inline-flex items-center justify-center h-4 text-xs font-medium text-white bg-violet-400 px-1.5 rounded-full">
                                {unreadMessages}
                              </span>
                            )}
                          </NavLink>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <NavLink end to="/notifications"
                            className={({ isActive }) =>
                              'flex items-center justify-between transition duration-150 truncate ' +
                              (isActive ? 'text-violet-500' : 'text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200')
                            }
                          >
                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Notifications</span>
                            {unreadNotifications > 0 && (
                              <span className="inline-flex items-center justify-center h-4 text-xs font-medium text-white bg-violet-400 px-1.5 rounded-full">
                                {unreadNotifications}
                              </span>
                            )}
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </React.Fragment>
                )}
              </SidebarLinkGroup>

              {/* Platforms — flat */}
              <NavItem to="/platforms" label="Platforms" icon={
                <svg width="16" height="16" viewBox="0 0 16 16" className="fill-current">
                  <path d="M9 6.855A3.502 3.502 0 0 0 8 0a3.5 3.5 0 0 0-1 6.855v1.656L5.534 9.65a3.5 3.5 0 1 0 1.229 1.578L8 10.267l1.238.962a3.5 3.5 0 1 0 1.229-1.578L9 8.511V6.855ZM6.5 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"/>
                </svg>
              } />

              {/* Manage group — Admin (if admin), Settings, Workspace */}
              <SidebarLinkGroup activecondition={pathname.includes('admin') || pathname.includes('settings') || pathname.includes('workspace')}>
                {(handleClick, open) => (
                  <React.Fragment>
                    <a href="#0"
                      className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                        pathname.includes('admin') || pathname.includes('settings') || pathname.includes('workspace')
                          ? '' : 'hover:text-gray-900 dark:hover:text-white'
                      }`}
                      onClick={(e) => { e.preventDefault(); handleClick(); setSidebarExpanded(true); }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className={`shrink-0 fill-current ${pathname.includes('admin') || pathname.includes('settings') || pathname.includes('workspace') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} width="16" height="16" viewBox="0 0 16 16">
                            <path d="M10.5 1a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2h-1.145a3.502 3.502 0 0 1-6.71 0H1a1 1 0 0 1 0-2h6.145A3.502 3.502 0 0 1 10.5 1ZM9 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM5.5 9a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2H8.855a3.502 3.502 0 0 1-6.71 0H1a1 1 0 1 1 0-2h1.145A3.502 3.502 0 0 1 5.5 9ZM4 12.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z"/>
                          </svg>
                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Manage</span>
                        </div>
                        <svg className={`w-3 h-3 shrink-0 ml-2 fill-current text-gray-400 dark:text-gray-500 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
                        </svg>
                      </div>
                    </a>
                    <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                      <ul className={`pl-8 mt-1 ${!open && 'hidden'}`}>
                        <SubLink to="/workspace" label="Workspaces" />
                        {activeWorkspace?.role === 'admin' && (
                          <SubLink to="/admin" label="Admin Panel" />
                        )}
                        <SubLink to="/settings" label="Settings" />
                      </ul>
                    </div>
                  </React.Fragment>
                )}
              </SidebarLinkGroup>

            </ul>
          </div>

          {/* Account section */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Account</span>
            </h3>
            <ul className="mt-3">

              {/* Workspace pill */}
              {activeWorkspace && (
                <li className="pl-4 pr-3 py-2 mb-0.5">
                  <button
                    onClick={() => navigate('/workspace')}
                    className="flex items-center gap-3 w-full text-left hover:opacity-80 transition"
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: activeWorkspace.color }}>
                      {activeWorkspace.initials}
                    </div>
                    <div className="min-w-0 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{activeWorkspace.company}</p>
                      <p className="text-xs text-gray-400 uppercase font-mono">{activeWorkspace.role}</p>
                    </div>
                  </button>
                </li>
              )}

              {/* Kill switch */}
              <li className="pl-4 pr-3 py-2 rounded-lg mb-0.5">
                <button onClick={handleKillSwitch}
                  className="flex items-center gap-4 w-full text-left text-red-500 hover:text-red-600 transition duration-150">
                  <svg className="shrink-0 fill-current" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708Z"/>
                  </svg>
                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Kill Switch</span>
                </button>
              </li>

              {/* Logout */}
              <li className="pl-4 pr-3 py-2 rounded-lg mb-0.5">
                <button onClick={handleLogout}
                  className="flex items-center gap-4 w-full text-left text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition duration-150">
                  <svg className="shrink-0 fill-current" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M11 8a1 1 0 0 1-1 1H4.414l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L4.414 7H10a1 1 0 0 1 1 1Z"/>
                    <path d="M9 2a1 1 0 0 0 0 2h4v8H9a1 1 0 0 0 0 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H9Z"/>
                  </svg>
                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Log out</span>
                </button>
              </li>

            </ul>
          </div>
        </div>

        {/* Expand / collapse */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180" width="16" height="16" viewBox="0 0 16 16">
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;