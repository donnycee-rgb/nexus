import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import ComposerMediaUpload     from '../partials/composer/ComposerMediaUpload';
import ComposerCaption         from '../partials/composer/ComposerCaption';
import ComposerPlatformSelector from '../partials/composer/ComposerPlatformSelector';
import ComposerAIGenerator     from '../partials/composer/ComposerAIGenerator';
import ComposerSongPicker      from '../partials/composer/ComposerSongPicker';
import ComposerScheduler       from '../partials/composer/ComposerScheduler';
import ComposerPreview         from '../partials/composer/ComposerPreview';
import { useAuthStore }        from '../features/auth/store';

export default function ComposerPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeWorkspace, user } = useAuthStore();

  const [media,    setMedia]    = useState(null);
  const [caption,  setCaption]  = useState('');
  const [selected, setSelected] = useState(activeWorkspace?.platforms ?? []);
  const [song,     setSong]     = useState(null);
  const [schedule, setSchedule] = useState({ enabled: false, date: '', time: '' });
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);

  const platforms = activeWorkspace?.platforms ?? [];

  function handleSelectCaption(val) {
    setCaption(typeof val === 'function' ? val(caption) : val);
  }

  function handleSelectHashtags(tags) {
    setCaption((prev) => {
      const base = prev.trim();
      return base ? `${base}\n\n${tags.join(' ')}` : tags.join(' ');
    });
  }

  async function handlePublish() {
    if (!caption.trim() && !media) return;
    if (selected.length === 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => navigate('/posts'), 1500);
  }

  const canPublish = (caption.trim() || media) && selected.length > 0;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Page header — Mosaic pattern */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 text-gray-500 hover:border-gray-300 shadow-xs p-2"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M10 3L4 8l6 5"/>
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">New Post</h1>
                  {activeWorkspace && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{activeWorkspace.company}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 text-gray-600 dark:text-gray-300 hover:border-gray-300 shadow-xs"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={!canPublish || loading || success}
                  className="btn bg-violet-500 hover:bg-violet-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[130px] justify-center shadow-xs"
                >
                  {success ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"/>
                      </svg>
                      Published!
                    </>
                  ) : loading ? (
                    <>
                      <svg className="animate-spin" width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0a8 8 0 0 1 8 8h-2a6 6 0 0 0-6-6V0Z"/>
                      </svg>
                      {schedule.enabled ? 'Scheduling...' : 'Publishing...'}
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                      </svg>
                      {schedule.enabled ? 'Schedule post' : 'Publish now'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Three column grid — Mosaic 12-col system */}
            <div className="grid grid-cols-12 gap-6">

              {/* LEFT: Media + Caption + Platforms + Song + Schedule */}
              <div className="col-span-full xl:col-span-5 space-y-6">

                <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl border border-gray-100 dark:border-gray-700/60 p-5">
                  <ComposerMediaUpload media={media} setMedia={setMedia} />
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl border border-gray-100 dark:border-gray-700/60 p-5">
                  <ComposerCaption
                    caption={caption}
                    setCaption={setCaption}
                    selectedPlatforms={selected}
                  />
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl border border-gray-100 dark:border-gray-700/60 p-5">
                  <ComposerPlatformSelector
                    platforms={platforms}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl border border-gray-100 dark:border-gray-700/60 p-5">
                  <ComposerSongPicker selectedSong={song} setSelectedSong={setSong} />
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl border border-gray-100 dark:border-gray-700/60 overflow-hidden">
                  <ComposerScheduler
                    schedule={schedule}
                    setSchedule={setSchedule}
                    selectedPlatforms={selected}
                  />
                </div>

              </div>

              {/* MIDDLE: AI Generator */}
              <div className="col-span-full xl:col-span-4">
                <div className="sticky top-6">
                  <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl border border-gray-100 dark:border-gray-700/60 overflow-hidden">
                    <ComposerAIGenerator
                      onSelectCaption={handleSelectCaption}
                      onSelectHashtags={handleSelectHashtags}
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT: Preview */}
              <div className="col-span-full xl:col-span-3">
                <div className="sticky top-6">
                  <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl border border-gray-100 dark:border-gray-700/60 p-5">
                    <ComposerPreview
                      media={media}
                      caption={caption}
                      selectedPlatforms={selected}
                      selectedSong={song}
                      user={user}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}