import React from 'react';
import BarChart from '../../charts/BarChart02';
import { getCssVariable } from '../../utils/Utils';
import { useAuthStore } from '../../features/auth/store';
import { POSTS_BY_WORKSPACE } from '../../utils/mockData';

function DashboardCard09() {
  const workspaceId = useAuthStore((s) => s.activeWorkspace?.id ?? 'ws-aurora');
  const posts = POSTS_BY_WORKSPACE[workspaceId] ?? [];
  const published = posts.filter((p) => p.status === 'published');
  const scheduled = posts.filter((p) => p.status === 'scheduled');
  const drafts = posts.filter((p) => p.status === 'draft');

  const totalLikes = published.reduce((t, p) => t + (p.metrics?.likes ?? 0), 0);
  const totalComments = published.reduce((t, p) => t + (p.metrics?.comments ?? 0), 0);
  const totalShares = published.reduce((t, p) => t + (p.metrics?.shares ?? 0), 0);

  const chartData = {
    labels: ['Posts'],
    datasets: [
      {
        label: 'Likes',
        data: [totalLikes],
        backgroundColor: getCssVariable('--color-violet-500'),
        hoverBackgroundColor: getCssVariable('--color-violet-600'),
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'Comments',
        data: [totalComments],
        backgroundColor: getCssVariable('--color-sky-500'),
        hoverBackgroundColor: getCssVariable('--color-sky-600'),
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'Shares',
        data: [totalShares],
        backgroundColor: getCssVariable('--color-green-500'),
        hoverBackgroundColor: getCssVariable('--color-green-600'),
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Post Interactions Breakdown</h2>
      </header>
      <div className="px-5 py-2">
        <div className="flex items-center gap-3 flex-wrap">
          <div>
            <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{published.length}</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 uppercase font-semibold">Published</div>
          </div>
          <div className="text-xs font-medium text-green-700 px-1.5 py-0.5 bg-green-500/20 rounded-full">
            +{scheduled.length} scheduled
          </div>
          <div className="text-xs font-medium text-gray-500 px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">
            {drafts.length} drafts
          </div>
        </div>
      </div>
      <div className="grow">
        <BarChart data={chartData} width={595} height={248} />
      </div>
    </div>
  );
}

export default DashboardCard09;