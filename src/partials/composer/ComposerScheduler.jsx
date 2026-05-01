import React from 'react';
import { PLATFORM_META } from '../../utils/mockData';

export default function ComposerScheduler({ schedule, setSchedule, selectedPlatforms }) {
  const { enabled, date, time } = schedule;

  function update(key, value) {
    setSchedule((prev) => ({ ...prev, [key]: value }));
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700/60 overflow-hidden">
      {/* Header toggle row */}
      <div className={`flex items-center justify-between px-4 py-3.5 transition-colors ${
        enabled ? 'bg-violet-500/5 dark:bg-violet-500/10 border-b border-violet-500/20' : 'bg-white dark:bg-gray-700/20'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            enabled ? 'bg-violet-500' : 'bg-gray-100 dark:bg-gray-700'
          }`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={enabled ? '#fff' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Schedule post</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {enabled ? 'Set a specific date and time' : 'Publish immediately'}
            </p>
          </div>
        </div>

        {/* Toggle switch */}
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => update('enabled', !enabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
            enabled ? 'bg-violet-500' : 'bg-gray-200 dark:bg-gray-600'
          }`}
        >
          <span className={`inline-block h-4.5 w-4.5 h-[18px] w-[18px] rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            enabled ? 'translate-x-[22px]' : 'translate-x-[3px]'
          }`} />
        </button>
      </div>

      {!enabled ? (
        <div className="flex items-center gap-3 px-4 py-3.5 bg-white dark:bg-gray-700/20">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Post publishes <span className="font-semibold text-gray-800 dark:text-gray-100">immediately</span> to all selected platforms.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5">Date</label>
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => update('date', e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => update('time', e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
              />
            </div>
          </div>

          {selectedPlatforms.length > 0 && date && time && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Queue preview</p>
              <div className="space-y-1.5">
                {selectedPlatforms.map((p) => {
                  const meta = PLATFORM_META[p];
                  return (
                    <div key={p} className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700/40 rounded-xl border border-gray-100 dark:border-gray-700/60">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold shrink-0"
                          style={{ backgroundColor: meta?.color ?? '#888' }}>
                          {meta?.short ?? p.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{meta?.name ?? p}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                          {new Date(`${date}T${time}`).toLocaleString('en-US', {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 p-3 bg-violet-500/5 border border-violet-500/15 rounded-xl">
            <svg className="fill-current text-violet-500 shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 16 16">
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2Zm6-4V8a6 6 0 0 0-5-5.916V1a1 1 0 0 0-2 0v1.084A6 6 0 0 0 2 8v4l-1 1v1h14v-1l-1-1Z"/>
            </svg>
            <p className="text-xs text-violet-600 dark:text-violet-400 leading-relaxed">
              You'll be notified when the post goes live. Cancel or reschedule anytime from the Scheduler.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}