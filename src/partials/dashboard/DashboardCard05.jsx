import React, { useState, useEffect, useRef } from 'react';
import RealtimeChart from '../../charts/RealtimeChart';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import { adjustColorOpacity, getCssVariable } from '../../utils/Utils';

function DashboardCard05() {
  const range = 35;

  const smoothStep = (current) => {
    const delta = (Math.random() - 0.48) * 6;
    const next = current + delta;
    return Number(Math.min(80, Math.max(8, next)).toFixed(1));
  };

  const currentValueRef = useRef(55);

  const [slicedData, setSlicedData] = useState(() => {
    const values = [];
    let v = currentValueRef.current;
    for (let i = 0; i < range; i++) {
      v = smoothStep(v);
      values.push(v);
    }
    currentValueRef.current = v;
    return values;
  });

  const [slicedLabels, setSlicedLabels] = useState(() => {
    const now = new Date();
    return Array.from({ length: range }, (_, i) => new Date(now - (range - i) * 2000));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = smoothStep(currentValueRef.current);
      currentValueRef.current = newValue;

      setSlicedData((prev) => {
        const [, ...rest] = prev;
        return [...rest, newValue];
      });

      setSlicedLabels((prev) => {
        const [, ...rest] = prev;
        return [...rest, new Date()];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: slicedLabels,
    datasets: [
      {
        data: slicedData,
        fill: true,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return;
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
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Live Engagement Rate</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Live</span>
          </div>
        </div>
      </header>

      <RealtimeChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard05;