import React, { useState, useEffect } from 'react';
import RealtimeChart from '../../charts/RealtimeChart';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import { adjustColorOpacity, getCssVariable } from '../../utils/Utils';

function DashboardCard05() {
  const [counter, setCounter] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [range] = useState(35);

  // Simulated engagement rate data points
  const data = [
    6.2, 6.5, 7.1, 7.4, 7.9, 8.1, 7.8, 7.6, 8.2, 8.4,
    7.9, 7.5, 7.8, 8.0, 8.3, 7.9, 7.4, 7.6, 8.1, 8.4,
    8.0, 7.7, 7.9, 8.2, 8.5, 8.1, 7.8, 7.5, 7.9, 8.0,
    8.3, 7.8, 7.6, 8.0, 8.2, 7.9, 7.7, 8.1, 8.4, 8.0,
    7.8, 7.9, 8.2, 8.5, 8.1, 7.9, 8.0, 8.3, 7.8, 7.6,
    8.1, 8.4, 8.0, 7.8, 8.2, 7.9, 7.7, 8.0, 8.3,
  ];

  const generateDates = () => {
    const now = new Date();
    return data.map((v, i) => new Date(now - 2000 - i * 2000));
  };

  const [slicedData, setSlicedData] = useState(data.slice(0, range));
  const [slicedLabels, setSlicedLabels] = useState(generateDates().slice(0, range).reverse());

  useEffect(() => {
    const interval = setInterval(() => setCounter((c) => c + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIncrement((inc) => {
      const next = inc + 1;
      if (next + range < data.length) {
        setSlicedData(([, ...rest]) => [...rest, data[next + range]]);
      }
      setSlicedLabels(([, ...rest]) => [...rest, new Date()]);
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  const chartData = {
    labels: slicedLabels,
    datasets: [
      {
        data: slicedData,
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
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Live Engagement Rate</h2>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Live</span>
        </div>
      </header>
      <RealtimeChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard05;