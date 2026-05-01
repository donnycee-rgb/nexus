import React, { useState } from 'react';
import { generateAICaption } from '../../utils/aiMockResponses';

export default function ComposerAIGenerator({ onSelectCaption, onSelectHashtags }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function generate() {
    if (!description.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await generateAICaption(description);
      setResult(data);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 bg-linear-to-r from-violet-500/[0.08] dark:from-violet-500/[0.15] to-transparent">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center shadow-xs">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">AI Caption Generator</p>
            <p className="text-[11px] text-violet-500 dark:text-violet-400">Powered by NEXUS AI</p>
          </div>
        </div>
        <span className="text-[10px] font-semibold text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
          Ready
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Describe your post e.g. new sneaker launch..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generate()}
            className="form-input flex-1 text-sm dark:bg-gray-700/50 dark:border-gray-700 dark:text-gray-100"
          />
          <button
            type="button"
            onClick={generate}
            disabled={loading || !description.trim()}
            className="btn bg-violet-500 hover:bg-violet-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 0 1 8 8h-2a6 6 0 0 0-6-6V0Z"/>
                </svg>
                Generating
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13 2L5 14h4l-1 6 9-10h-4l1-8z"/>
                </svg>
                Generate
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-xs text-red-500">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-100 dark:bg-gray-700/60" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Results</span>
              <div className="flex-1 h-px bg-gray-100 dark:bg-gray-700/60" />
            </div>

            {/* Captions */}
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-2">
                Captions — click to use
              </p>
              <div className="space-y-2">
                {result.captions?.map((c, i) => (
                  <button key={i} type="button" onClick={() => onSelectCaption(c)}
                    className="w-full text-left text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700/60 hover:border-violet-400 dark:hover:border-violet-500 rounded-lg px-3.5 py-2.5 transition-colors duration-150 group"
                  >
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 w-4 h-4 rounded-full bg-violet-500/10 text-violet-500 text-[9px] font-bold flex items-center justify-center mt-0.5 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                        {i + 1}
                      </span>
                      {c}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Hashtags */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500">Hashtags</p>
                <button type="button" onClick={() => onSelectHashtags(result.hashtags ?? [])}
                  className="text-xs font-medium text-violet-500 hover:text-violet-600 transition">
                  Add all
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.hashtags?.map((tag, i) => (
                  <button key={i} type="button"
                    onClick={() => onSelectCaption((prev) => prev + ' ' + tag)}
                    className="text-xs bg-gray-100 dark:bg-gray-700/60 hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400 text-gray-500 dark:text-gray-400 border border-transparent hover:border-violet-500/20 rounded-full px-2.5 py-0.5 transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Best time + tip */}
            <div className="grid grid-cols-2 gap-2">
              {result.best_time && (
                <div className="bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700/60 rounded-lg p-3">
                  <p className="text-[10px] font-semibold uppercase text-gray-400 mb-1">Best time</p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{result.best_time}</p>
                </div>
              )}
              {result.tip && (
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                  <p className="text-[10px] font-semibold uppercase text-yellow-600 dark:text-yellow-500 mb-1">Pro tip</p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{result.tip}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}