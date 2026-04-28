import React from 'react';
import { useAuthStore } from '../../features/auth/store';
import { POSTS_BY_WORKSPACE, PLATFORM_META } from '../../utils/mockData';

function DashboardCard10() {
  const workspaceId = useAuthStore((s) => s.activeWorkspace?.id ?? 'ws-aurora');
  const posts = (POSTS_BY_WORKSPACE[workspaceId] ?? [])
    .filter((p) => p.status === 'published')
    .sort((a, b) => (b.metrics?.likes ?? 0) - (a.metrics?.likes ?? 0))
    .slice(0, 5);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Top Performing Posts</h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Post</div></th>
                <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Platforms</div></th>
                <th className="p-2 whitespace-nowrap"><div className="font-semibold text-center">Likes</div></th>
                <th className="p-2 whitespace-nowrap"><div className="font-semibold text-center">Reach</div></th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                        {post.type === 'video' ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-violet-500">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-violet-500">
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                          </svg>
                        )}
                      </div>
                      <div className="font-medium text-gray-800 dark:text-gray-100 truncate max-w-[120px]">{post.title}</div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex gap-1">
                      {post.platforms.slice(0, 3).map((p) => (
                        <span key={p} className="text-xs px-1.5 py-0.5 rounded font-medium"
                          style={{ backgroundColor: `${PLATFORM_META[p]?.color}22`, color: PLATFORM_META[p]?.color }}>
                          {PLATFORM_META[p]?.short ?? p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-center font-medium text-green-500">{(post.metrics?.likes ?? 0).toLocaleString()}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-center text-violet-500">{(post.metrics?.reach ?? 0).toLocaleString()}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard10;