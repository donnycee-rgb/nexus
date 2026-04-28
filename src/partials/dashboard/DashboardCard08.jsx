import React from 'react';
import LineChart from '../../charts/LineChart02';
import { getCssVariable } from '../../utils/Utils';
import { useAuthStore } from '../../features/auth/store';
import { ANALYTICS_BY_WORKSPACE } from '../../utils/mockData';

function DashboardCard08() {
  const workspaceId = useAuthStore((s) => s.activeWorkspace?.id ?? 'ws-aurora');
  const analytics = ANALYTICS_BY_WORKSPACE[workspaceId];
  const reachTrend = analytics?.reachTrend ?? [];
  const engTrend = analytics?.engagementTrend ?? [];

  const chartData = {
    labels: reachTrend.map((d) => d.label),
    datasets: [
      {
        label: 'Reach',
        data: reachTrend.map((d) => d.value),
        borderColor: getCssVariable('--color-violet-500'),
        fill: false,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: getCssVariable('--color-violet-500'),
        pointHoverBackgroundColor: getCssVariable('--color-violet-500'),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
      {
        label: 'Engagement (x10K)',
        data: engTrend.map((d) => d.value * 10000),
        borderColor: getCssVariable('--color-sky-500'),
        fill: false,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: getCssVariable('--color-sky-500'),
        pointHoverBackgroundColor: getCssVariable('--color-sky-500'),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
      {
        label: 'Target',
        data: reachTrend.map((d) => d.value * 0.9),
        borderColor: getCssVariable('--color-green-500'),
        fill: false,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: getCssVariable('--color-green-500'),
        pointHoverBackgroundColor: getCssVariable('--color-green-500'),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Reach vs Engagement Over Time</h2>
      </header>
      <LineChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard08;