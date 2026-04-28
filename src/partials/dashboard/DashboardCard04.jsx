import React from 'react';
import BarChart from '../../charts/BarChart01';
import { getCssVariable } from '../../utils/Utils';
import { useAuthStore } from '../../features/auth/store';
import { ANALYTICS_BY_WORKSPACE, PLATFORM_META } from '../../utils/mockData';

function DashboardCard04() {
  const workspaceId = useAuthStore((s) => s.activeWorkspace?.id ?? 'ws-aurora');
  const analytics = ANALYTICS_BY_WORKSPACE[workspaceId];
  const breakdown = analytics?.platformBreakdown ?? [];

  const labels = breakdown.map((b) => PLATFORM_META[b.platform]?.name ?? b.platform);
  const followersData = breakdown.map((b) => b.followers);
  const engagementData = breakdown.map((b) => Math.round(b.engagementRate * 1000));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Followers',
        data: followersData,
        backgroundColor: getCssVariable('--color-violet-500'),
        hoverBackgroundColor: getCssVariable('--color-violet-600'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      {
        label: 'Engagement (x1000)',
        data: engagementData,
        backgroundColor: getCssVariable('--color-sky-500'),
        hoverBackgroundColor: getCssVariable('--color-sky-600'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Followers vs Engagement by Platform</h2>
      </header>
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;