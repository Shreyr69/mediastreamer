import React from 'react'

export default function Home() {
  return (
    <div className="text-black dark:text-white">
      <div className="mb-4">
        <button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium text-sm transition-colors">
          All
        </button>
      </div>
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-2">Welcome to Streamix</h2>
        <p className="text-gray-600 dark:text-gray-400">Videos will be loaded here using Google API</p>
      </div>
    </div>
  )
}
