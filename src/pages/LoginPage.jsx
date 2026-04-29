import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store';
import { DEMO_CREDENTIALS } from '../utils/mockData';

export default function LoginPage() {
  const navigate  = useNavigate();
  const login     = useAuthStore((s) => s.login);
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login({ email, password });
    setLoading(false);
    if (!result.success) { setError(result.message); return; }
    navigate('/verify', { replace: true });
  }

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="relative flex">
        {/* Left panel */}
        <div className="w-full lg:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <a className="flex items-center gap-2" href="/">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-violet-500">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                      <path d="M13 2L5 14h4l-1 6 9-10h-4l1-8z"/>
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-wide">NEXUS</span>
                </a>
              </div>
            </div>

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">
                Welcome back
              </h1>

              {error && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="email">
                      Email address
                    </label>
                    <input
                      id="email" type="email" autoComplete="email"
                      className="form-input w-full dark:bg-gray-800 dark:border-gray-700/60 dark:text-gray-100"
                      placeholder="you@company.com"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password" type={showPw ? 'text' : 'password'}
                        autoComplete="current-password"
                        className="form-input w-full dark:bg-gray-800 dark:border-gray-700/60 dark:text-gray-100 pr-10"
                        placeholder="••••••••••••"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPw((v) => !v)}
                      >
                        {showPw ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                            <line x1="1" y1="1" x2="23" y2="23"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn w-full bg-violet-500 hover:bg-violet-600 text-white disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </form>

              {/* Demo hint */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700/60">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Demo credentials</p>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300">{DEMO_CREDENTIALS.email}</p>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300">{DEMO_CREDENTIALS.password}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-1/2" aria-hidden="true">
          <div className="w-full h-full bg-gradient-to-br from-violet-900 via-violet-800 to-violet-600 flex flex-col items-center justify-center p-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
                  <path d="M20 4L10 18h6l-2 10 12-14h-6l2-10z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">NEXUS</h2>
              <p className="text-violet-200 text-lg leading-relaxed max-w-sm">
                Your social media command center. Manage every platform, every post, every message — from one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}