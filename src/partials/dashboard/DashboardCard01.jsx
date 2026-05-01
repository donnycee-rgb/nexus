import React from 'react';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import { adjustColorOpacity, getCssVariable } from '../../utils/Utils';
import { useAuthStore } from '../../features/auth/store';
import { ANALYTICS_BY_WORKSPACE } from '../../utils/mockData';

const InstagramIcon = () => (
  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#E1306C' }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.92 4.92 0 0 1 1.772 1.153 4.92 4.92 0 0 1 1.153 1.772c.163.46.35 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.92 4.92 0 0 1-1.153 1.772 4.92 4.92 0 0 1-1.772 1.153c-.46.163-1.26.35-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.92 4.92 0 0 1-1.772-1.153A4.92 4.92 0 0 1 1.64 19.43c-.163-.46-.35-1.26-.403-2.43C1.175 15.734 1.163 15.354 1.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.92 4.92 0 0 1 1.153-1.772A4.92 4.92 0 0 1 4.56 1.795c.46-.163 1.26-.35 2.43-.403C8.256 2.175 8.636 2.163 12 2.163zm0 1.802c-3.146 0-3.519.011-4.77.068-1.07.049-1.65.226-2.037.375a3.116 3.116 0 0 0-1.158.753 3.116 3.116 0 0 0-.753 1.158c-.149.387-.326.967-.375 2.037C2.858 9.396 2.847 9.77 2.847 12c0 2.23.011 2.604.068 3.855.049 1.07.226 1.65.375 2.037.175.465.4.8.753 1.158.358.353.693.578 1.158.753.387.149.967.326 2.037.375C8.48 20.227 8.854 20.238 12 20.238c3.146 0 3.52-.011 4.77-.068 1.07-.049 1.65-.226 2.037-.375a3.116 3.116 0 0 0 1.158-.753 3.116 3.116 0 0 0 .753-1.158c.149-.387.326-.967.375-2.037.057-1.251.068-1.625.068-3.855 0-2.23-.011-2.604-.068-3.855-.049-1.07-.226-1.65-.375-2.037a3.116 3.116 0 0 0-.753-1.158 3.116 3.116 0 0 0-1.158-.753c-.387-.149-.967-.326-2.037-.375C15.52 3.976 15.146 3.965 12 3.965zm0 3.063A4.972 4.972 0 1 1 12 17 4.972 4.972 0 0 1 12 7.028zm0 1.802a3.17 3.17 0 1 0 0 6.34 3.17 3.17 0 0 0 0-6.34zm5.23-3.22a1.162 1.162 0 1 1 0 2.324 1.162 1.162 0 0 1 0-2.324z"/>
    </svg>
  </div>
);

const TikTokIcon = () => (
  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#FF0050' }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  </div>
);

const EngagementIcon = () => (
  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#E8621A' }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  </div>
);

function StatBlock({ icon, label, value, change, chartData }) {
  const isPositive = change >= 0;
  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Top: icon + label + badge */}
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <div className="min-w-0">
          <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">{label}</div>
        </div>
      </div>
      {/* Middle: value + change */}
      <div className="flex items-center gap-2 mb-2">
        <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 tabular-nums">{value}</div>
        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${isPositive ? 'text-green-700 bg-green-500/20' : 'text-red-700 bg-red-500/20'}`}>
          {isPositive ? '+' : ''}{change.toFixed(1)}%
        </span>
      </div>
      {/* Sparkline */}
      <div className="h-12">
        <LineChart data={chartData} width={160} height={48} />
      </div>
    </div>
  );
}

function DashboardCard01() {
  const workspaceId = useAuthStore((s) => s.activeWorkspace?.id ?? 'ws-aurora');
  const analytics = ANALYTICS_BY_WORKSPACE[workspaceId];
  const engTrend = analytics?.engagementTrend ?? [];
  const reachTrend = analytics?.reachTrend ?? [];
  const summary = analytics?.summary ?? {};

  const followers = summary.followers?.current ?? 0;
  const followersChange = summary.followers?.change ?? 0;
  const reach = summary.impressions?.current ?? 0;
  const reachChange = summary.impressions?.change ?? 0;
  const engRate = summary.engagementRate?.current ?? 0;
  const engChange = summary.engagementRate?.change ?? 0;

  const makeChartData = (trend, colorKey) => ({
    labels: trend.map((d) => d.label),
    datasets: [
      {
        data: trend.map((d) => d.value),
        fill: true,
        backgroundColor: function(context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          return chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: adjustColorOpacity(getCssVariable(colorKey), 0) },
            { stop: 1, color: adjustColorOpacity(getCssVariable(colorKey), 0.2) },
          ]);
        },
        borderColor: getCssVariable(colorKey),
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: getCssVariable(colorKey),
        clip: 20,
        tension: 0.3,
      },
    ],
  });

  const followersChart = makeChartData(engTrend, '--color-violet-500');
  const reachChart = makeChartData(reachTrend, '--color-sky-500');
  const engChart = makeChartData(engTrend, '--color-green-500');

  const followersFormatted = followers >= 1000 ? `${(followers / 1000).toFixed(1)}K` : followers.toLocaleString();
  const reachFormatted = reach >= 1000 ? `${(reach / 1000).toFixed(0)}K` : reach.toLocaleString();

  return (
    <div className="col-span-full bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="flex divide-x divide-gray-100 dark:divide-gray-700/60 px-2">
        <div className="flex-1 px-5 py-4">
          <StatBlock
            icon={<InstagramIcon />}
            label="Followers"
            value={followersFormatted}
            change={followersChange}
            chartData={followersChart}
          />
        </div>
        <div className="flex-1 px-5 py-4">
          <StatBlock
            icon={<TikTokIcon />}
            label="Total Reach"
            value={reachFormatted}
            change={reachChange}
            chartData={reachChart}
          />
        </div>
        <div className="flex-1 px-5 py-4">
          <StatBlock
            icon={<EngagementIcon />}
            label="Avg Engagement Rate"
            value={`${engRate.toFixed(2)}%`}
            change={engChange}
            chartData={engChart}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardCard01;