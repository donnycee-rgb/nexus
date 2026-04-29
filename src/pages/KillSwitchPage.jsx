import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store';

export default function KillSwitchPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  function relaunch() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500 flex items-center justify-center mb-6">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-red-500 mb-3">SYSTEM OFFLINE</h1>
      <p className="text-gray-400 mb-8 max-w-sm">All platform connections severed. Kill switch is active. No data is being transmitted.</p>
      <button onClick={relaunch} className="btn bg-red-500 hover:bg-red-600 text-white px-8">
        Manual Relaunch
      </button>
    </div>
  );
}
