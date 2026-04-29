import React from 'react';
import { useAuthStore } from '../../features/auth/store';
import { SCHEDULER_BY_WORKSPACE, POSTS_BY_WORKSPACE, PLATFORM_META } from '../../utils/mockData';

function formatDate(isoString) {
  if (!isoString) return '—';
  const d = new Date(isoString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ' at ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function DashboardCard13() {
  const workspaceId = useAuthStore((s) => s.activeWorkspace?.id ?? 'ws-aurora');
  const scheduled = SCHEDULER_BY_WORKSPACE[workspaceId] ?? [];
  const posts = POSTS_BY_WORKSPACE[workspaceId] ?? [];

  // Upcoming scheduled
  const upcoming = scheduled.filter((s) => s.status === 'scheduled').slice(0, 3);
  // Recent published
  const recent = posts
    .filter((p) => p.status === 'published')
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 3);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Scheduled &amp; Published</h2>
      </header>
      <div className="p-3">

        {/* Upcoming */}
        <div>
          <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs font-semibold p-2">
            Upcoming
          </header>
          <ul className="my-1">
            {upcoming.map((item, i) => (
              <li key={item.id} className="flex px-2">
                <div className="w-9 h-9 rounded-full shrink-0 bg-violet-500 my-2 mr-3 flex items-center justify-center">
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 16 16">
                    <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5ZM4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z"/>
                  </svg>
                </div>
                <div className={`grow flex items-center ${i < upcoming.length - 1 ? 'border-b border-gray-100 dark:border-gray-700/60' : ''} text-sm py-2`}>
                  <div className="grow flex justify-between gap-2">
                    <div className="self-center">
                      <span className="font-medium text-gray-800 dark:text-gray-100">{item.title}</span>
                      <div className="flex gap-1 mt-0.5">
                        {item.platforms.map((p) => (
                          <span key={p} className="text-xs px-1 py-0.5 rounded font-medium"
                            style={{ backgroundColor: `${PLATFORM_META[p]?.color}22`, color: PLATFORM_META[p]?.color }}>
                            {PLATFORM_META[p]?.short ?? p}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 self-start text-xs text-yellow-600 dark:text-yellow-400 whitespace-nowrap font-medium mt-1">
                      {formatDate(item.scheduledFor)}
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {upcoming.length === 0 && (
              <li className="px-2 py-3 text-sm text-gray-400 dark:text-gray-500">No upcoming posts scheduled.</li>
            )}
          </ul>
        </div>

        {/* Recently published */}
        <div>
          <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs font-semibold p-2">
            Recently Published
          </header>
          <ul className="my-1">
            {recent.map((post, i) => (
              <li key={post.id} className="flex px-2">
                <div className="w-9 h-9 rounded-full shrink-0 bg-green-500 my-2 mr-3 flex items-center justify-center">
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 16 16">
                    <path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"/>
                  </svg>
                </div>
                <div className={`grow flex items-center ${i < recent.length - 1 ? 'border-b border-gray-100 dark:border-gray-700/60' : ''} text-sm py-2`}>
                  <div className="grow flex justify-between gap-2">
                    <div className="self-center">
                      <span className="font-medium text-gray-800 dark:text-gray-100">{post.title}</span>
                      <div className="flex gap-3 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                        <span>{(post.metrics?.likes ?? 0).toLocaleString()} likes</span>
                        <span>{(post.metrics?.reach ?? 0).toLocaleString()} reach</span>
                      </div>
                    </div>
                    <div className="shrink-0 self-start">
                      <span className="font-medium text-violet-500 hover:text-violet-600 text-xs">
                        View
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default DashboardCard13;