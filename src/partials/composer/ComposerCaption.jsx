import React from 'react';

const PLATFORM_LIMITS = {
  instagram: 2200,
  tiktok: 2200,
  facebook: 63206,
  x: 280,
  youtube: 5000,
  whatsapp: 1000,
  linkedin: 3000,
};

export default function ComposerCaption({ caption, setCaption, selectedPlatforms }) {
  const length = caption.length;
  const limits = selectedPlatforms
    .filter((p) => PLATFORM_LIMITS[p])
    .map((p) => ({ platform: p, limit: PLATFORM_LIMITS[p] }))
    .sort((a, b) => a.limit - b.limit);
  const tightest = limits[0];
  const pct = tightest ? (length / tightest.limit) * 100 : 0;
  const isWarning = pct >= 80;
  const isOver = pct >= 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Caption</span>
        {tightest && (
          <span className={`text-xs font-mono tabular-nums px-2 py-0.5 rounded-full ${
            isOver ? 'bg-red-500/10 text-red-500' : isWarning ? 'bg-yellow-500/10 text-yellow-500' : 'bg-gray-100 dark:bg-gray-700/60 text-gray-400 dark:text-gray-500'
          }`}>
            {length} / {tightest.limit.toLocaleString()}
          </span>
        )}
      </div>

      <div className="relative">
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={6}
          placeholder="Write your caption... or generate one with AI"
          className={`w-full rounded-xl resize-none text-sm bg-gray-50 dark:bg-gray-700/40 border transition-all duration-200 px-4 py-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 ${
            isOver
              ? 'border-red-400 focus:ring-red-500/20 focus:border-red-400'
              : 'border-gray-200 dark:border-gray-700/60 focus:ring-violet-500/20 focus:border-violet-400'
          }`}
        />
        {/* Character arc indicator */}
        {tightest && (
          <div className="absolute bottom-3 right-3">
            <svg width="28" height="28" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" fill="none" stroke="#e5e7eb" strokeWidth="2.5"/>
              <circle cx="14" cy="14" r="11" fill="none"
                stroke={isOver ? '#ef4444' : isWarning ? '#f59e0b' : '#e8621a'}
                strokeWidth="2.5"
                strokeDasharray={`${Math.min(pct, 100) * 0.691} 69.1`}
                strokeLinecap="round"
                transform="rotate(-90 14 14)"
              />
            </svg>
          </div>
        )}
      </div>

      {selectedPlatforms.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {limits.map(({ platform, limit }) => {
            const over = length > limit;
            return (
              <span key={platform} className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium border ${
                over ? 'bg-red-500/10 text-red-500 border-red-500/20'
                : length > limit * 0.8 ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'
                : 'bg-gray-100 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 border-transparent'
              }`}>
                {over ? (
                  <svg width="7" height="7" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708Z"/></svg>
                ) : (
                  <svg width="7" height="7" viewBox="0 0 16 16" fill="currentColor"><path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"/></svg>
                )}
                {platform} · {limit >= 1000 ? `${(limit/1000).toFixed(0)}K` : limit}
              </span>
            );
          })}
        </div>
      )}
      {isOver && tightest && (
        <p className="mt-1.5 text-xs text-red-500">Exceeds {tightest.platform} limit by {length - tightest.limit} chars.</p>
      )}
    </div>
  );
}