import React from 'react';
import { PLATFORM_META } from '../../utils/mockData';

const PLATFORM_ICONS = {
  instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.92 4.92 0 0 1 1.772 1.153 4.92 4.92 0 0 1 1.153 1.772c.163.46.35 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.92 4.92 0 0 1-1.153 1.772 4.92 4.92 0 0 1-1.772 1.153c-.46.163-1.26.35-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.92 4.92 0 0 1-1.772-1.153A4.92 4.92 0 0 1 1.64 19.43c-.163-.46-.35-1.26-.403-2.43C1.175 15.734 1.163 15.354 1.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.92 4.92 0 0 1 1.153-1.772A4.92 4.92 0 0 1 4.56 1.795c.46-.163 1.26-.35 2.43-.403C8.256 2.175 8.636 2.163 12 2.163zm0 1.802c-3.146 0-3.519.011-4.77.068-1.07.049-1.65.226-2.037.375a3.116 3.116 0 0 0-1.158.753 3.116 3.116 0 0 0-.753 1.158c-.149.387-.326.967-.375 2.037C2.858 9.396 2.847 9.77 2.847 12c0 2.23.011 2.604.068 3.855.049 1.07.226 1.65.375 2.037.175.465.4.8.753 1.158.358.353.693.578 1.158.753.387.149.967.326 2.037.375C8.48 20.227 8.854 20.238 12 20.238c3.146 0 3.52-.011 4.77-.068 1.07-.049 1.65-.226 2.037-.375a3.116 3.116 0 0 0 1.158-.753 3.116 3.116 0 0 0 .753-1.158c.149-.387.326-.967.375-2.037.057-1.251.068-1.625.068-3.855 0-2.23-.011-2.604-.068-3.855-.049-1.07-.226-1.65-.375-2.037a3.116 3.116 0 0 0-.753-1.158 3.116 3.116 0 0 0-1.158-.753c-.387-.149-.967-.326-2.037-.375C15.52 3.976 15.146 3.965 12 3.965zm0 3.063A4.972 4.972 0 1 1 12 17 4.972 4.972 0 0 1 12 7.028zm0 1.802a3.17 3.17 0 1 0 0 6.34 3.17 3.17 0 0 0 0-6.34zm5.23-3.22a1.162 1.162 0 1 1 0 2.324 1.162 1.162 0 0 1 0-2.324z"/>
    </svg>
  ),
  tiktok: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  ),
  facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  ),
  x: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  youtube: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  whatsapp: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  ),
};

export default function ComposerPlatformSelector({ platforms, selected, setSelected }) {
  const allSelected = selected.length === platforms.length;

  function toggle(platform) {
    setSelected((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  }

  function toggleAll() {
    setSelected(allSelected ? [] : [...platforms]);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Distribute to</span>
        <button type="button" onClick={toggleAll} className="text-xs font-medium text-violet-500 hover:text-violet-600 transition">
          {allSelected ? 'Deselect all' : 'Select all'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {platforms.map((platform) => {
          const meta = PLATFORM_META[platform];
          const isChecked = selected.includes(platform);
          const Icon = PLATFORM_ICONS[platform];
          return (
            <button
              key={platform}
              type="button"
              onClick={() => toggle(platform)}
              className={`relative flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 text-left group overflow-hidden ${
                isChecked
                  ? 'border-violet-500/40 bg-violet-500/5 dark:bg-violet-500/10 shadow-sm shadow-violet-500/10'
                  : 'border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-700/20 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {/* Colored left accent bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl transition-all duration-200 ${isChecked ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundColor: meta?.color }}
              />

              {/* Platform icon circle */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white transition-all duration-200"
                style={{ backgroundColor: isChecked ? meta?.color : '#9ca3af' }}
              >
                {Icon}
              </div>

              <span className={`text-sm font-semibold transition-colors ${isChecked ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
                {meta?.name ?? platform}
              </span>

              {/* Check indicator */}
              <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                isChecked ? 'border-violet-500 bg-violet-500' : 'border-gray-300 dark:border-gray-600'
              }`}>
                {isChecked && (
                  <svg width="7" height="7" viewBox="0 0 16 16" fill="white">
                    <path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"/>
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selected.length === 0 && (
        <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.93 9.412-1 4.705c-.07.34-.45.635-.832.367a.343.343 0 0 1-.1-.4l1-4.705c.07-.34.45-.635.832-.367.18.121.198.337.1.4zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
          Select at least one platform to publish.
        </p>
      )}
    </div>
  );
}