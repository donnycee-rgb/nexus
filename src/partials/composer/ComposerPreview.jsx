import React, { useState } from 'react';
import { PLATFORM_META } from '../../utils/mockData';

const PLATFORM_DIMS = {
  instagram: { label: 'Square 1:1',       ratio: '1/1'    },
  tiktok:    { label: 'Vertical 9:16',    ratio: '9/16'   },
  facebook:  { label: 'Landscape 16:9',   ratio: '16/9'   },
  x:         { label: 'Landscape 16:9',   ratio: '16/9'   },
  youtube:   { label: 'Landscape 16:9',   ratio: '16/9'   },
  whatsapp:  { label: 'Square 1:1',       ratio: '1/1'    },
  linkedin:  { label: 'Landscape 1.91:1', ratio: '1.91/1' },
};

const PLATFORM_ICONS = {
  instagram: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.92 4.92 0 0 1 1.772 1.153 4.92 4.92 0 0 1 1.153 1.772c.163.46.35 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.92 4.92 0 0 1-1.153 1.772 4.92 4.92 0 0 1-1.772 1.153c-.46.163-1.26.35-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.92 4.92 0 0 1-1.772-1.153A4.92 4.92 0 0 1 1.64 19.43c-.163-.46-.35-1.26-.403-2.43C1.175 15.734 1.163 15.354 1.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.92 4.92 0 0 1 1.153-1.772A4.92 4.92 0 0 1 4.56 1.795c.46-.163 1.26-.35 2.43-.403C8.256 2.175 8.636 2.163 12 2.163zm0 1.802c-3.146 0-3.519.011-4.77.068-1.07.049-1.65.226-2.037.375a3.116 3.116 0 0 0-1.158.753 3.116 3.116 0 0 0-.753 1.158c-.149.387-.326.967-.375 2.037C2.858 9.396 2.847 9.77 2.847 12c0 2.23.011 2.604.068 3.855.049 1.07.226 1.65.375 2.037.175.465.4.8.753 1.158.358.353.693.578 1.158.753.387.149.967.326 2.037.375C8.48 20.227 8.854 20.238 12 20.238c3.146 0 3.52-.011 4.77-.068 1.07-.049 1.65-.226 2.037-.375a3.116 3.116 0 0 0 1.158-.753 3.116 3.116 0 0 0 .753-1.158c.149-.387.326-.967.375-2.037.057-1.251.068-1.625.068-3.855 0-2.23-.011-2.604-.068-3.855-.049-1.07-.226-1.65-.375-2.037a3.116 3.116 0 0 0-.753-1.158 3.116 3.116 0 0 0-1.158-.753c-.387-.149-.967-.326-2.037-.375C15.52 3.976 15.146 3.965 12 3.965zm0 3.063A4.972 4.972 0 1 1 12 17 4.972 4.972 0 0 1 12 7.028zm0 1.802a3.17 3.17 0 1 0 0 6.34 3.17 3.17 0 0 0 0-6.34zm5.23-3.22a1.162 1.162 0 1 1 0 2.324 1.162 1.162 0 0 1 0-2.324z"/></svg>,
  tiktok: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>,
  facebook: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>,
  x: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  linkedin: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  youtube: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  whatsapp: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
};

export default function ComposerPreview({ media, caption, selectedPlatforms, selectedSong, user }) {
  const [activePlatform, setActivePlatform] = useState(selectedPlatforms[0] ?? null);

  React.useEffect(() => {
    if (!selectedPlatforms.includes(activePlatform)) {
      setActivePlatform(selectedPlatforms[0] ?? null);
    }
  }, [selectedPlatforms, activePlatform]);

  if (selectedPlatforms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center bg-gray-50 dark:bg-gray-700/30 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
        <svg className="fill-current text-gray-300 dark:text-gray-600 mb-2" width="28" height="28" viewBox="0 0 24 24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
        <p className="text-sm text-gray-400 dark:text-gray-500">Select a platform to preview</p>
      </div>
    );
  }

  const meta = PLATFORM_META[activePlatform];
  const dims = PLATFORM_DIMS[activePlatform] ?? { label: 'Standard', ratio: '1/1' };
  const displayName = user?.name ?? 'Your Account';
  const handle = `@${displayName.toLowerCase().replace(/\s/g, '')}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Preview</span>
        <span className="text-[11px] text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700/60 px-2 py-0.5 rounded-full">{dims.label}</span>
      </div>

      {/* Platform tabs */}
      <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
        {selectedPlatforms.map((p) => {
          const m = PLATFORM_META[p];
          const isActive = activePlatform === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => setActivePlatform(p)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all duration-200 border ${
                isActive ? 'text-white border-transparent shadow-md' : 'bg-gray-100 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              style={isActive ? { backgroundColor: m?.color, boxShadow: `0 4px 12px ${m?.color}40` } : {}}
            >
              <span className="text-inherit opacity-90">{PLATFORM_ICONS[p]}</span>
              {m?.name ?? p}
            </button>
          );
        })}
      </div>

      {/* Phone frame */}
      <div className="relative mx-auto max-w-[280px]">
        <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden shadow-xl shadow-black/10">
          {/* Platform header */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 dark:border-gray-800">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
              style={{ backgroundColor: meta?.color ?? '#888' }}>
              {PLATFORM_ICONS[activePlatform]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">{displayName}</p>
              <p className="text-[10px] text-gray-400">{handle}</p>
            </div>
            <div className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white shrink-0"
              style={{ backgroundColor: meta?.color }}>
              {meta?.name}
            </div>
          </div>

          {/* Media with correct aspect ratio */}
          <div className="relative bg-gray-100 dark:bg-gray-800 overflow-hidden" style={{ aspectRatio: dims.ratio }}>
            {media ? (
              media.type === 'video' ? (
                <video src={media.preview} className="w-full h-full object-cover" muted loop autoPlay playsInline />
              ) : (
                <img src={media.preview} alt="Post" className="w-full h-full object-cover" />
              )
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <svg className="fill-current text-gray-300 dark:text-gray-600" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                <p className="text-xs text-gray-400 dark:text-gray-600">No media uploaded</p>
              </div>
            )}

            {selectedSong && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded shrink-0 flex items-center justify-center"
                    style={{ background: `hsl(${selectedSong.id * 60}, 60%, 50%)` }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
                      <path d="M9 18V5l12-2v13M9 18c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-2c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-[10px] font-semibold truncate">{selectedSong.title}</p>
                    <p className="text-gray-300 text-[9px] truncate">{selectedSong.artist}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Caption */}
          {caption && (
            <div className="px-3 py-2.5">
              <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
                <span className="font-bold text-gray-900 dark:text-gray-100 mr-1">{handle}</span>
                {caption}
              </p>
            </div>
          )}

          {/* Engagement bar */}
          <div className="flex items-center gap-3 px-3 py-2 border-t border-gray-100 dark:border-gray-800">
            <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition text-[11px]">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314Z"/></svg>
              Like
            </button>
            <button className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition text-[11px]">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12Z"/></svg>
              Comment
            </button>
            <button className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition text-[11px]">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5Z"/></svg>
              Share
            </button>
          </div>
        </div>

        {/* Glow effect matching platform color */}
        <div className="absolute -inset-1 rounded-3xl -z-10 opacity-20 blur-xl transition-all duration-500"
          style={{ backgroundColor: meta?.color }} />
      </div>

      <p className="mt-3 text-[11px] text-center text-gray-400 dark:text-gray-500">
        Perfectly fitted for {meta?.name} — no cropping or compression
      </p>
    </div>
  );
}