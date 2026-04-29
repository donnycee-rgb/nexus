import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store';
import { PLATFORM_META } from '../utils/mockData';

export default function WorkspacePage() {
  const navigate      = useNavigate();
  const workspaces    = useAuthStore((s) => s.workspaces);
  const activeWs      = useAuthStore((s) => s.activeWorkspace);
  const setWorkspace  = useAuthStore((s) => s.setWorkspace);

  function select(ws) {
    setWorkspace(ws);
    navigate('/', { replace: true });
  }

  return (
    <main className="bg-white dark:bg-gray-900 min-h-[100dvh] flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-violet-500">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="white">
                <path d="M13 2L5 14h4l-1 6 9-10h-4l1-8z"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-wide">NEXUS</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Choose your workspace
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Each workspace is fully isolated — brands never mix
          </p>
        </div>

        {/* Workspace cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces.map((ws) => {
            const isActive = activeWs?.id === ws.id;
            return (
              <button
                key={ws.id}
                type="button"
                onClick={() => select(ws)}
                className="bg-white dark:bg-gray-800 shadow-xs rounded-xl border p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  borderColor: isActive ? ws.color : undefined,
                }}
              >
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4"
                  style={{ backgroundColor: ws.color }}
                >
                  {ws.initials}
                </div>

                {/* Info */}
                <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {ws.company}
                </h2>
                <p className="text-xs font-mono uppercase text-gray-400 dark:text-gray-500 mb-4">
                  {ws.role} &middot; {ws.membersCount} members
                </p>

                {/* Platform chips */}
                <div className="flex flex-wrap gap-1.5">
                  {ws.platforms.map((p) => {
                    const meta = PLATFORM_META[p];
                    return (
                      <span
                        key={p}
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${meta?.color}22`,
                          color: meta?.color,
                        }}
                      >
                        {meta?.name ?? p}
                      </span>
                    );
                  })}
                </div>

                {isActive && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-medium" style={{ color: ws.color }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"/>
                    </svg>
                    Currently active
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}