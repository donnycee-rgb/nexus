import React, { useState } from 'react';
import { MOCK_SONGS } from '../../utils/mockData';

const MusicIcon = ({ color = 'currentColor', size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M9 18V5l12-2v13M9 18c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-2c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/>
  </svg>
);

export default function ComposerSongPicker({ selectedSong, setSelectedSong }) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = MOCK_SONGS.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.artist.toLowerCase().includes(search.toLowerCase())
  );

  function select(song) {
    setSelectedSong(selectedSong?.id === song.id ? null : song);
    setOpen(false);
  }

  const hues = [12, 200, 140, 280, 45, 320];

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all duration-200 ${
          selectedSong
            ? 'border-violet-500/40 bg-violet-500/5 dark:bg-violet-500/10'
            : 'border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-700/20 hover:border-gray-300 dark:hover:border-gray-600'
        }`}
      >
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
          selectedSong ? 'bg-violet-500' : 'bg-gray-100 dark:bg-gray-700'
        }`}>
          <MusicIcon color={selectedSong ? '#fff' : '#9ca3af'} size={16} />
        </div>
        <div className="text-left flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
            {selectedSong ? selectedSong.title : 'Add a song'}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
            {selectedSong ? selectedSong.artist : 'For Instagram & TikTok Reels'}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {selectedSong && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setSelectedSong(null); }}
              className="text-[11px] text-gray-400 hover:text-red-500 transition px-1.5 py-0.5 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
            >
              Remove
            </button>
          )}
          <svg
            className={`fill-current text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            width="12" height="12" viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
          </svg>
        </div>
      </button>

      {open && (
        <div className="mt-2 rounded-xl border border-gray-200 dark:border-gray-700/60 overflow-hidden bg-white dark:bg-gray-800 shadow-xl shadow-black/5">
          <div className="p-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 fill-current text-gray-400" width="12" height="12" viewBox="0 0 16 16">
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z"/>
                <path d="m13.314 11.9 2.393 2.393a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414Z"/>
              </svg>
              <input
                type="text"
                placeholder="Search songs or artists..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
              />
            </div>
          </div>

          <ul className="divide-y divide-gray-100 dark:divide-gray-700/60 max-h-56 overflow-y-auto">
            {filtered.map((song) => {
              const isSelected = selectedSong?.id === song.id;
              const hue = hues[(song.id - 1) % hues.length];
              return (
                <li key={song.id}>
                  <button
                    type="button"
                    onClick={() => select(song)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      isSelected ? 'bg-violet-500/5 dark:bg-violet-500/10' : 'hover:bg-gray-50 dark:hover:bg-gray-700/40'
                    }`}
                  >
                    {/* Album art */}
                    <div
                      className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, hsl(${hue},70%,55%), hsl(${hue + 40},60%,40%))` }}
                    >
                      <MusicIcon color="white" size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${isSelected ? 'text-violet-600 dark:text-violet-400' : 'text-gray-800 dark:text-gray-100'}`}>
                        {song.title}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{song.artist}</p>
                    </div>
                    {song.trending && (
                      <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide bg-violet-500/10 text-violet-500 border border-violet-500/20 rounded-full px-2 py-0.5">
                        Trending
                      </span>
                    )}
                    {isSelected && (
                      <div className="shrink-0 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 16 16" fill="white">
                          <path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"/>
                        </svg>
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
                No songs found for "{search}"
              </li>
            )}
          </ul>

          <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-700/20">
            <p className="text-xs text-gray-400 dark:text-gray-500">Song attaches like Instagram & TikTok Reels</p>
          </div>
        </div>
      )}
    </div>
  );
}