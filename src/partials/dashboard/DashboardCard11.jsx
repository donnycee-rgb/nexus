import React from 'react';
import BarChart from '../../charts/BarChart03';
import { getCssVariable } from '../../utils/Utils';
import { useAuthStore } from '../../features/auth/store';
import { ANALYTICS_BY_WORKSPACE } from '../../utils/mockData';

function DashboardCard11() {
  const workspaceId = useAuthStore((s) => s.activeWorkspace?.id ?? 'ws-aurora');
  const analytics = ANALYTICS_BY_WORKSPACE[workspaceId];
  const ctr = analytics?.summary?.ctr?.current ?? 0;
  const change = analytics?.summary?.ctr?.change ?? 0;
  const isPositive = change >= 0;
  const breakdown = analytics?.platformBreakdown ?? [];

  const chartData = {
    labels: ['Platforms'],
    datasets: breakdown.map((b, i) => {
      const colors = [
        getCssVariable('--color-violet-500'),
        getCssVariable('--color-sky-500'),
        getCssVariable('--color-green-500'),
        getCssVariable('--color-yellow-500'),
      ];
      const hovers = [
        getCssVariable('--color-violet-600'),
        getCssVariable('--color-sky-600'),
        getCssVariable('--color-green-600'),
        getCssVariable('--color-yellow-600'),
      ];
      return {
        label: b.platform,
        data: [b.trafficShare],
        backgroundColor: colors[i % colors.length],
        hoverBackgroundColor: hovers[i % hovers.length],
        barPercentage: 1,
        categoryPercentage: 1,
      };
    }),
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Click-Through Rate by Platform</h2>
      </header>
      <div className="px-5 py-2">
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{ctr.toFixed(2)}%</div>
          <div className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${isPositive ? 'text-green-700 bg-green-500/20' : 'text-red-700 bg-red-500/20'}`}>
            {isPositive ? '+' : ''}{change.toFixed(1)}%
          </div>
        </div>
      </div>
      <div className="grow">
        <BarChart data={chartData} width={595} height={48} />
      </div>
    </div>
  );
}

export default DashboardCard11;