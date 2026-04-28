import React from 'react';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import { adjustColorOpacity, getCssVariable } from '../../utils/Utils';
import { useAuthStore } from '../../features/auth/store';
import { ANALYTICS_BY_WORKSPACE } from '../../utils/mockData';

function DashboardCard01() {
  const workspaceId = useAuthStore((s) => s.activeWorkspace?.id ?? 'ws-aurora');
  const analytics = ANALYTICS_BY_WORKSPACE[workspaceId];
  const trend = analytics?.engagementTrend ?? [];
  const summary = analytics?.summary ?? {};
  const followers = summary.followers?.current ?? 0;
  const change = summary.followers?.change ?? 0;
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
        data: trend.map((d) => d.value * 0.85),
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
          {/* Instagram icon */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E1306C' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.92 4.92 0 0 1 1.772 1.153 4.92 4.92 0 0 1 1.153 1.772c.163.46.35 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.92 4.92 0 0 1-1.153 1.772 4.92 4.92 0 0 1-1.772 1.153c-.46.163-1.26.35-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.92 4.92 0 0 1-1.772-1.153A4.92 4.92 0 0 1 1.64 19.43c-.163-.46-.35-1.26-.403-2.43C1.175 15.734 1.163 15.354 1.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.92 4.92 0 0 1 1.153-1.772A4.92 4.92 0 0 1 4.56 1.795c.46-.163 1.26-.35 2.43-.403C8.256 2.175 8.636 2.163 12 2.163zm0 1.802c-3.146 0-3.519.011-4.77.068-1.07.049-1.65.226-2.037.375a3.116 3.116 0 0 0-1.158.753 3.116 3.116 0 0 0-.753 1.158c-.149.387-.326.967-.375 2.037C2.858 9.396 2.847 9.77 2.847 12c0 2.23.011 2.604.068 3.855.049 1.07.226 1.65.375 2.037.175.465.4.8.753 1.158.358.353.693.578 1.158.753.387.149.967.326 2.037.375C8.48 20.227 8.854 20.238 12 20.238c3.146 0 3.52-.011 4.77-.068 1.07-.049 1.65-.226 2.037-.375a3.116 3.116 0 0 0 1.158-.753 3.116 3.116 0 0 0 .753-1.158c.149-.387.326-.967.375-2.037.057-1.251.068-1.625.068-3.855 0-2.23-.011-2.604-.068-3.855-.049-1.07-.226-1.65-.375-2.037a3.116 3.116 0 0 0-.753-1.158 3.116 3.116 0 0 0-1.158-.753c-.387-.149-.967-.326-2.037-.375C15.52 3.976 15.146 3.965 12 3.965zm0 3.063A4.972 4.972 0 1 1 12 17 4.972 4.972 0 0 1 12 7.028zm0 1.802a3.17 3.17 0 1 0 0 6.34 3.17 3.17 0 0 0 0-6.34zm5.23-3.22a1.162 1.162 0 1 1 0 2.324 1.162 1.162 0 0 1 0-2.324z"/>
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Instagram</h2>
          </div>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Followers</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {followers.toLocaleString()}
          </div>
          <div className={`text-sm font-medium px-1.5 rounded-full ${isPositive ? 'text-green-700 bg-green-500/20' : 'text-red-700 bg-red-500/20'}`}>
            {isPositive ? '+' : ''}{change.toFixed(1)}%
          </div>
        </div>
      </div>
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        <LineChart data={chartData} width={389} height={128} />
      </div>
    </div>
  );
}

export default DashboardCard01;