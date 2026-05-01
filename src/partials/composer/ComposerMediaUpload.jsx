import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ComposerMediaUpload({ media, setMedia }) {
  const [error, setError] = useState('');

  const onDrop = useCallback((accepted, rejected) => {
    setError('');
    if (rejected.length > 0) { setError('File type not supported or too large (max 2GB).'); return; }
    const file = accepted[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setMedia({ file, preview, type: file.type.startsWith('video') ? 'video' : 'image', name: file.name, size: file.size });
  }, [setMedia]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'video/*': [] },
    maxSize: 2 * 1024 * 1024 * 1024,
    multiple: false,
  });

  function removeMedia() {
    if (media?.preview) URL.revokeObjectURL(media.preview);
    setMedia(null);
    setError('');
  }

  function formatSize(bytes) {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Media</span>
        <span className="text-xs text-gray-400 dark:text-gray-600">· no compression</span>
      </div>

      {!media ? (
        <div
          {...getRootProps()}
          className={`flex-1 min-h-[200px] relative rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden group ${
            isDragActive
              ? 'border-2 border-violet-500 bg-violet-500/5'
              : 'border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-violet-400 dark:hover:border-violet-500'
          }`}
        >
          <input {...getInputProps()} />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-30 dark:opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, #e8621a22 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative flex flex-col items-center justify-center h-full gap-4 py-12">
            {/* Upload icon */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isDragActive ? 'bg-violet-500 scale-110' : 'bg-gray-100 dark:bg-gray-700/60 group-hover:bg-violet-500/10'
            }`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={isDragActive ? '#fff' : '#e8621a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {isDragActive ? 'Drop it here' : 'Drag & drop your media'}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">JPG, PNG, GIF, WEBP, MP4, MOV · Max 2GB</p>
            </div>
            <button type="button" className="px-5 py-2 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-xs font-semibold transition-colors shadow-lg shadow-violet-500/20">
              Browse files
            </button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700/60 flex-1">
          {media.type === 'video' ? (
            <video src={media.preview} controls className="w-full max-h-72 object-contain bg-black" />
          ) : (
            <img src={media.preview} alt="Preview" className="w-full max-h-72 object-contain bg-gray-50 dark:bg-gray-900" />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider bg-violet-500 text-white px-2 py-0.5 rounded-full">
                {media.type}
              </span>
              <span className="text-white text-xs truncate">{media.name}</span>
              <span className="text-gray-400 text-xs shrink-0">{formatSize(media.size)}</span>
            </div>
            <span className="shrink-0 text-[10px] font-medium text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded-full">
              Original quality
            </span>
          </div>
          <button onClick={removeMedia} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708Z"/>
            </svg>
          </button>
        </div>
      )}
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}