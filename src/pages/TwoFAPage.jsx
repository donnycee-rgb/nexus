import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store';
import { TWO_FA_CONFIG } from '../utils/mockData';

export default function TwoFAPage() {
  const navigate     = useNavigate();
  const verifyTwoFA  = useAuthStore((s) => s.verifyTwoFA);
  const isAuthed     = useAuthStore((s) => s.isAuthenticated);
  const [code,       setCode]       = useState('');
  const [error,      setError]      = useState('');
  const [loading,    setLoading]    = useState(false);
  const inputRef = useRef(null);

  if (!isAuthed) {
    return null; // ProtectedRoute will redirect
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const ok = verifyTwoFA(code);
    setLoading(false);
    if (!ok) {
      setError('Incorrect code. Try again.');
      setCode('');
      inputRef.current?.focus();
      return;
    }
    navigate('/workspace', { replace: true });
  }

  function handleChange(e) {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(val);
    if (val.length === 6) {
      setTimeout(() => {
        const ok = verifyTwoFA(val);
        if (ok) navigate('/workspace', { replace: true });
        else { setError('Incorrect code.'); setCode(''); }
      }, 300);
    }
  }

  return (
    <main className="bg-white dark:bg-gray-900 min-h-[100dvh] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-violet-500">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="white">
              <path d="M13 2L5 14h4l-1 6 9-10h-4l1-8z"/>
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-wide">NEXUS</span>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl border border-gray-200 dark:border-gray-700/60 p-8">
          {/* Shield icon */}
          <div className="w-14 h-14 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-violet-500">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-2">
            Two-factor verification
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
            Enter the 6-digit code from your authenticator app
          </p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={handleChange}
              placeholder="000000"
              className="form-input w-full text-center text-4xl tracking-[0.5em] font-mono mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              style={{ letterSpacing: '0.5em' }}
            />
            <button
              type="submit"
              disabled={code.length !== 6 || loading}
              className="btn w-full bg-violet-500 hover:bg-violet-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify code'}
            </button>
          </form>

          <div className="mt-5 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700/60">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Demo 2FA code</p>
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">{TWO_FA_CONFIG.validCode}</p>
          </div>
        </div>
      </div>
    </main>
  );
}