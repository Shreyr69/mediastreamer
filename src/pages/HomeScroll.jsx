import React, { useState, useEffect, useRef, useCallback } from 'react'
import VideoCard from '../components/VideoCard'
import ShimmerCard from '../components/ShimmerCard'

export default function HomeScroll() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hasMore, setHasMore] = useState(true);
  const nextPageTokenRef = useRef(null);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);
  
  const categories = ['All', 'Music', 'Gaming', 'News', 'Live', 'Sports', 'Learning'];
  const VIDEOS_PER_PAGE = 24; 

  useEffect(() => {
    async function fetchInitialVideos() {
      setLoading(true);
      setError(null);
      setVideos([]);
      nextPageTokenRef.current = null;
      setHasMore(true);
      
      try {
        const API_KEY = import.meta.env.VITE_VIDEO_API_KEY;
        const searchQuery = activeCategory === 'All' ? 'trending' : activeCategory;
        
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${VIDEOS_PER_PAGE}&q=${searchQuery}&type=video&key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        setVideos(data.items || []);
        nextPageTokenRef.current = data.nextPageToken || null;
        setHasMore(!!data.nextPageToken);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchInitialVideos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCategory]);

  
  const loadMoreVideos = useCallback(async () => {
    if (!hasMore || loadingMore || loading) return;
    
    setLoadingMore(true);
    
    try {
      const API_KEY = import.meta.env.VITE_VIDEO_API_KEY;
      const searchQuery = activeCategory === 'All' ? 'trending' : activeCategory;
      const pageTokenParam = nextPageTokenRef.current ? `&pageToken=${nextPageTokenRef.current}` : '';
      
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${VIDEOS_PER_PAGE}&q=${searchQuery}&type=video&key=${API_KEY}${pageTokenParam}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch more videos');
      }

      const data = await response.json();
      setVideos(prev => [...prev, ...(data.items || [])]);
      nextPageTokenRef.current = data.nextPageToken || null;
      setHasMore(!!data.nextPageToken);
    } catch (err) {
      console.error('Error loading more videos:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [activeCategory, hasMore, loadingMore, loading]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreVideos();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreVideos]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="text-black dark:text-white">
      {/* Category Filters */}
      <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              activeCategory === category
                ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
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
          <p className="text-red-500 mb-2">Error loading videos</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      )}

      {/* Videos Grid */}
      {!loading && !error && videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {videos.map((video) => (
            <VideoCard key={video.id.videoId || video.id} video={video} />
          ))}
        </div>
      )}

      {/* Load More Trigger */}
      {!loading && !error && hasMore && (
        <div ref={loadMoreRef} className="py-8 text-center">
          {loadingMore && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mt-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ShimmerCard key={`loader-${index}`} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* End of Results */}
      {!loading && !error && !hasMore && videos.length > 0 && (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          <p>You've reached the end of the videos</p>
        </div>
      )}

      {/* No Videos State */}
      {!loading && !error && videos.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-2">No videos found</h2>
          <p className="text-gray-600 dark:text-gray-400">Try selecting a different category</p>
        </div>
      )}
    </div>
  )
}
