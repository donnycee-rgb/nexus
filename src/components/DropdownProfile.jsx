import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';
import { useAuthStore } from '../features/auth/store';

function DropdownProfile({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  const user = useAuthStore((s) => s.user);
  const activeWorkspace = useAuthStore((s) => s.activeWorkspace);

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {/* Avatar initials */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: activeWorkspace?.color ?? '#E8621A' }}
        >
          {initials}
        </div>
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">
            {activeWorkspace?.company ?? 'NEXUS'}
          </span>
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)}>
          {/* User info */}
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">
            <div className="font-semibold text-gray-800 dark:text-gray-100">{user?.name ?? 'User'}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email ?? ''}</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 italic mt-0.5">{user?.title ?? activeWorkspace?.role}</div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3 gap-2"
                to="/settings"
                onClick={() => setDropdownOpen(false)}
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 16 16">
                  <path d="M10.5 1a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2h-1.145a3.502 3.502 0 0 1-6.71 0H1a1 1 0 0 1 0-2h6.145A3.502 3.502 0 0 1 10.5 1ZM9 4.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0ZM5.5 9a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2H8.855a3.502 3.502 0 0 1-6.71 0H1a1 1 0 1 1 0-2h.145A3.502 3.502 0 0 1 5.5 9ZM4 12.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z"/>
                </svg>
                Settings
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3 gap-2"
                to="/team"
                onClick={() => setDropdownOpen(false)}
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 16 16">
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-2c1.17 0 2.25-.38 3.13-1H3.87A4.973 4.973 0 007 12zm-4.42-3h8.84A5.003 5.003 0 0012 7c0-.73-.16-1.42-.44-2.05l-1.29 1.29A2.99 2.99 0 0110 7c0 1.66-1.34 3-3 3S4 8.66 4 7c0-.28.04-.55.1-.81L2.44 4.95A4.97 4.97 0 002 7c0 .73.16 1.42.44 2.05l.14-.05z"/>
                </svg>
                Team & Permissions
              </Link>
            </li>
            <li className="border-t border-gray-200 dark:border-gray-700/60 mt-1 pt-1">
              <Link
                className="font-medium text-sm text-red-500 hover:text-red-600 flex items-center py-1 px-3 gap-2"
                to="/signin"
                onClick={() => setDropdownOpen(false)}
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 16 16">
                  <path d="M6 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2h2v1h6V3H7v1H5V2a1 1 0 0 1 1-1Z"/>
                  <path d="M1.293 7.293 4.586 4 6 5.414 4.414 7H11v2H4.414L6 10.586 4.586 12l-3.293-3.293a1 1 0 0 1 0-1.414Z"/>
                </svg>
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;