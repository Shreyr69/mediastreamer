import React from 'react'
import { FiClock, FiX } from 'react-icons/fi'

export default function SearchHistory({ 
  searchHistory, 
  onSelectSearch, 
  onRemoveSearch, 
  onClearAll 
}) {
  if (searchHistory.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl p-4 z-50">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          No search history
        </p>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-semibold text-black dark:text-white">
          Search History
        </span>
        <button
          onClick={onClearAll}
          className="text-xs text-blue-500 hover:text-blue-600 font-medium"
        >
          Clear all
        </button>
      </div>

      {/* History Items */}
      <div className="max-h-80 overflow-y-auto">
        {searchHistory.map((search, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 group transition-colors"
          >
            <FiClock className="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0" />
            <button
              onClick={() => onSelectSearch(search)}
              className="flex-1 text-left text-sm text-black dark:text-white"
            >
              {search}
            </button>
            <button
              onClick={() => onRemoveSearch(search)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-all"
            >
              <FiX className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
