import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Banner() {
  const [bannerOpen, setBannerOpen] = useState(true);

  if (!bannerOpen) return null;

  return (
    <div className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-50">
      <div className="bg-gray-900 border border-gray-700/60 text-gray-100 text-sm p-3 md:rounded-lg shadow-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"></span>
          <span className="text-gray-300">
            <span className="font-semibold text-white">Aurora Labs</span> analytics synced ·{' '}
            <Link className="font-medium text-violet-400 hover:text-violet-300 underline underline-offset-2" to="/analytics">
              View report
            </Link>
          </span>
        </div>
        <button
          className="text-gray-500 hover:text-gray-400 pl-2 ml-1 border-l border-gray-700/60 shrink-0"
          onClick={() => setBannerOpen(false)}
        >
          <span className="sr-only">Close</span>
          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
            <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Banner;