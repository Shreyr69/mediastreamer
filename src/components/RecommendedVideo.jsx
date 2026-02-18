import React from 'react'
import { Link } from 'react-router-dom'

export default function RecommendedVideo({ video }) {
  const { id, snippet } = video;
  const videoId = id.videoId || id;
  const { title, thumbnails, channelTitle } = snippet;

  return (
    <Link to={`/watch/${videoId}`} className="flex gap-2 group cursor-pointer mb-3">
      {/* Thumbnail */}
      <div className="relative shrink-0 w-40">
        <img
          src={thumbnails.medium.url}
          alt={title}
          className="w-full aspect-video object-cover rounded-lg"
        />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
          0:00
        </div>
      </div>

      {/* Video Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold line-clamp-2 text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300">
          {title}
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          {channelTitle}
        </p>
        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mt-1">
          <span>120K views</span>
        </div>
      </div>
    </Link>
  );
}
