import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';
import { useAuthStore } from '../features/auth/store';
import { NOTIFICATIONS_BY_WORKSPACE } from '../utils/mockData';

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const TYPE_ICONS = {
  message:  '💬',
  publish:  '🚀',
  approval: '⏳',
  follow:   '👥',
  system:   '⚙️',
};

function DropdownNotifications({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  const workspaceId = useAuthStore((s) => s.activeWorkspace?.id ?? 'ws-aurora');
  const notifications = (NOTIFICATIONS_BY_WORKSPACE[workspaceId] ?? []).slice(0, 5);
  const unreadCount = notifications.filter((n) => !n.read).length;

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
        className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full ${dropdownOpen && 'bg-gray-200 dark:bg-gray-800'}`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Notifications</span>
        <svg className="fill-current text-gray-500/80 dark:text-gray-400/80" width={16} height={16} viewBox="0 0 16 16">
          <path d="M7 0a7 7 0 0 0-7 7c0 1.202.308 2.33.84 3.316l-.789 2.368a1 1 0 0 0 1.265 1.265l2.595-.865a1 1 0 0 0-.632-1.898l-.698.233.3-.9a1 1 0 0 0-.104-.85A4.97 4.97 0 0 1 2 7a5 5 0 0 1 5-5 4.99 4.99 0 0 1 4.093 2.135 1 1 0 1 0 1.638-1.148A6.99 6.99 0 0 0 7 0Z" />
          <path d="M11 6a5 5 0 0 0 0 10c.807 0 1.567-.194 2.24-.533l1.444.482a1 1 0 0 0 1.265-1.265l-.482-1.444A4.962 4.962 0 0 0 16 11a5 5 0 0 0-5-5Zm-3 5a3 3 0 0 1 6 0c0 .588-.171 1.134-.466 1.6a1 1 0 0 0-.115.82 1 1 0 0 0-.82.114A2.973 2.973 0 0 1 11 14a3 3 0 0 1-3-3Z" />
        </svg>
        {unreadCount > 0 && (
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-gray-100 dark:border-gray-900 rounded-full"></div>
        )}
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)}>
          <div className="flex items-center justify-between pt-1.5 pb-2 px-4">
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">Notifications</div>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center h-4 text-xs font-medium text-white bg-violet-500 px-1.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <ul>
            {notifications.map((n) => (
              <li key={n.id} className="border-b border-gray-200 dark:border-gray-700/60 last:border-0">
                <Link
                  className={`block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-700/20 ${!n.read ? 'bg-violet-500/5' : ''}`}
                  to="#0"
                  onClick={() => setDropdownOpen(false)}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-base mt-0.5">{TYPE_ICONS[n.type] ?? '🔔'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm mb-0.5">
                        <span className="font-medium text-gray-800 dark:text-gray-100">{n.title}</span>
                        {!n.read && <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-violet-500 align-middle"></span>}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{n.body}</div>
                      <div className="text-xs font-medium text-gray-400 dark:text-gray-500 mt-1">{timeAgo(n.createdAt)}</div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
            {notifications.length === 0 && (
              <li className="py-4 px-4 text-sm text-gray-400 dark:text-gray-500 text-center">No notifications</li>
            )}
          </ul>
          <div className="border-t border-gray-200 dark:border-gray-700/60 px-4 py-2">
            <Link
              className="text-xs font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
              to="/notifications"
              onClick={() => setDropdownOpen(false)}
            >
              View all notifications →
            </Link>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownNotifications;