import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import VideoCard from '../components/VideoCard'
import ShimmerCard from '../components/ShimmerCard'

export default function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    async function fetchSearchResults() {
      setLoading(true);
      setError(null);
      
      try {
        const API_KEY = import.meta.env.VITE_VIDEO_API_KEY;
        
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=${searchQuery}&type=video&key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        setVideos(data.items || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching search results:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSearchResults();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchQuery]);

  if (!searchQuery) {
    return (
      <div className="text-black dark:text-white text-center py-20">
        <h2 className="text-2xl font-semibold mb-2">Search for videos</h2>
        <p className="text-gray-600 dark:text-gray-400">Enter a search term to find videos</p>
      </div>
    );
  }

  return (
    <div className="text-black dark:text-white">
      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">
          Search results for "{searchQuery}"
        </h1>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {Array.from({ length: 24 }).map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-20">
          <p className="text-red-500 mb-2">Error loading search results</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      )}

      {/* Search Results Grid */}
      {!loading && !error && videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {videos.map((video) => (
            <VideoCard key={video.id.videoId || video.id} video={video} />
          ))}
        </div>
      )}

      {/* No Results State */}
      {!loading && !error && videos.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-2">No results found</h2>
          <p className="text-gray-600 dark:text-gray-400">Try a different search term</p>
        </div>
      )}
    </div>
  )
}
