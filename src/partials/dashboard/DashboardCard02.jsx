import React from 'react';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import { adjustColorOpacity, getCssVariable } from '../../utils/Utils';
import { useAuthStore } from '../../features/auth/store';
import { ANALYTICS_BY_WORKSPACE } from '../../utils/mockData';

function DashboardCard02() {
  const workspaceId = useAuthStore((s) => s.activeWorkspace?.id ?? 'ws-aurora');
  const analytics = ANALYTICS_BY_WORKSPACE[workspaceId];
  const trend = analytics?.reachTrend ?? [];
  const summary = analytics?.summary ?? {};
  const reach = summary.impressions?.current ?? 0;
  const change = summary.impressions?.change ?? 0;
  const isPositive = change >= 0;

  const chartData = {
    labels: trend.map((d) => d.label),
    datasets: [
      {
        data: trend.map((d) => d.value),
        fill: true,
        backgroundColor: function(context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          return chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: adjustColorOpacity(getCssVariable('--color-violet-500'), 0) },
            { stop: 1, color: adjustColorOpacity(getCssVariable('--color-violet-500'), 0.2) },
          ]);
        },
        borderColor: getCssVariable('--color-violet-500'),
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
        data: trend.map((d) => d.value * 0.78),
        borderColor: adjustColorOpacity(getCssVariable('--color-gray-500'), 0.25),
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: adjustColorOpacity(getCssVariable('--color-gray-500'), 0.25),
        pointHoverBackgroundColor: adjustColorOpacity(getCssVariable('--color-gray-500'), 0.25),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FF0050' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">TikTok</h2>
          </div>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Total Reach</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {reach >= 1000 ? `${(reach / 1000).toFixed(0)}K` : reach.toLocaleString()}
          </div>
          <div className={`text-sm font-medium px-1.5 rounded-full ${isPositive ? 'text-green-700 bg-green-500/20' : 'text-red-700 bg-red-500/20'}`}>
            {isPositive ? '+' : ''}{change.toFixed(1)}%
          </div>
        </div>
      </div>
      <div className="grow max-sm:max-h-[128px] max-h-[128px]">
        <LineChart data={chartData} width={389} height={128} />
      </div>
    </div>
  );
}

export default DashboardCard02;