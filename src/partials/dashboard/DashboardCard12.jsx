import React from 'react';
import { useAuthStore } from '../../features/auth/store';
import { NOTIFICATIONS_BY_WORKSPACE } from '../../utils/mockData';

const TYPE_CONFIG = {
  message:  { bg: 'bg-violet-500', icon: <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36"><path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z"/></svg> },
  publish:  { bg: 'bg-green-500',  icon: <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36"><path d="M15 13v-3l-5 4 5 4v-3h8a1 1 0 000-2h-8zM21 21h-8a1 1 0 000 2h8v3l5-4-5-4v3z"/></svg> },
  approval: { bg: 'bg-yellow-500', icon: <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36"><path d="M18 10l-6 16h4v-6h4v6h4L18 10z"/></svg> },
  follow:   { bg: 'bg-sky-500',    icon: <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36"><path d="M18 12a4 4 0 100 8 4 4 0 000-8zm0 10c-4.4 0-8 2-8 4v1h16v-1c0-2-3.6-4-8-4z"/></svg> },
  system:   { bg: 'bg-gray-400',   icon: <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36"><path d="M18 10a8 8 0 100 16 8 8 0 000-16zm1 12h-2v-4h2v4zm0-6h-2v-2h2v2z"/></svg> },
};

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function DashboardCard12() {
  const workspaceId = useAuthStore((s) => s.activeWorkspace?.id ?? 'ws-aurora');
  const notifications = (NOTIFICATIONS_BY_WORKSPACE[workspaceId] ?? []).slice(0, 5);
  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  function renderItem(n, isLast) {
    const cfg = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.system;
    return (
      <li key={n.id} className="flex px-2">
        <div className={`w-9 h-9 rounded-full shrink-0 ${cfg.bg} my-2 mr-3`}>
          {cfg.icon}
        </div>
        <div className={`grow flex items-center ${!isLast ? 'border-b border-gray-100 dark:border-gray-700/60' : ''} text-sm py-2`}>
          <div className="grow flex justify-between gap-2">
            <div className="self-center">
              <span className="font-medium text-gray-800 dark:text-gray-100">{n.title}</span>
              <span className="text-gray-500 dark:text-gray-400"> — {n.body}</span>
            </div>
            <div className="shrink-0 self-end ml-2 text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
              {timeAgo(n.createdAt)}
            </div>
          </div>
        </div>
      </li>
    );
  }

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Recent Activity</h2>
        {unread.length > 0 && (
          <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-violet-500 px-2 rounded-full">
            {unread.length} new
          </span>
        )}
      </header>
      <div className="p-3">
        {unread.length > 0 && (
          <div>
            <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs font-semibold p-2">
              New
            </header>
            <ul className="my-1">
              {unread.map((n, i) => renderItem(n, i === unread.length - 1))}
            </ul>
          </div>
        )}
        {read.length > 0 && (
          <div>
            <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs font-semibold p-2">
              Earlier
            </header>
            <ul className="my-1">
              {read.map((n, i) => renderItem(n, i === read.length - 1))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardCard12;