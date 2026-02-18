import React, { useState } from 'react'
import VideoCard from '../components/VideoCard'
import { FiTrash2 } from 'react-icons/fi'

export default function WatchHistory() {
  const [watchHistory, setWatchHistory] = useState(() => {
    const history = localStorage.getItem('watchHistory');
    return history ? JSON.parse(history) : [];
  });

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear your watch history?')) {
      localStorage.removeItem('watchHistory');
      setWatchHistory([]);
    }
  };

  const removeVideo = (videoId) => {
    const updatedHistory = watchHistory.filter(video => 
      (video.id.videoId || video.id) !== videoId
    );
    setWatchHistory(updatedHistory);
    localStorage.setItem('watchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="text-black dark:text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Watch History</h1>
        {watchHistory.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* History Grid */}
      {watchHistory.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {watchHistory.map((video) => (
            <div key={video.id.videoId || video.id} className="relative group">
              <VideoCard video={video} />
              <button
                onClick={() => removeVideo(video.id.videoId || video.id)}
                className="absolute top-2 right-2 p-2 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove from history"
              >
                <FiTrash2 className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📺</div>
          <h2 className="text-xl font-semibold mb-2">No watch history</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Videos you watch will appear here
          </p>
        </div>
      )}
    </div>
  )
}
