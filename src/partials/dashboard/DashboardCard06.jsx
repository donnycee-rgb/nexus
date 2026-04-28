import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import { getCssVariable } from '../../utils/Utils';
import { useAuthStore } from '../../features/auth/store';
import { ANALYTICS_BY_WORKSPACE, PLATFORM_META } from '../../utils/mockData';

function DashboardCard06() {
  const workspaceId = useAuthStore((s) => s.activeWorkspace?.id ?? 'ws-aurora');
  const analytics = ANALYTICS_BY_WORKSPACE[workspaceId];
  const breakdown = analytics?.platformBreakdown ?? [];

  const COLORS = [
    getCssVariable('--color-violet-500'),
    getCssVariable('--color-sky-500'),
    getCssVariable('--color-green-500'),
    getCssVariable('--color-yellow-500'),
  ];
  const HOVER = [
    getCssVariable('--color-violet-600'),
    getCssVariable('--color-sky-600'),
    getCssVariable('--color-green-600'),
    getCssVariable('--color-yellow-600'),
  ];

  const chartData = {
    labels: breakdown.map((b) => PLATFORM_META[b.platform]?.name ?? b.platform),
    datasets: [
      {
        label: 'Traffic Share',
        data: breakdown.map((b) => b.trafficShare),
        backgroundColor: breakdown.map((_, i) => COLORS[i % COLORS.length]),
        hoverBackgroundColor: breakdown.map((_, i) => HOVER[i % HOVER.length]),
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Traffic Mix</h2>
      </header>
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default DashboardCard06;