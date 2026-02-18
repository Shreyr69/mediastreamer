import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RecommendedVideo from '../components/RecommendedVideo'

export default function Watch() {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchVideoDetails() {
      try {
        const API_KEY = import.meta.env.VITE_VIDEO_API_KEY;
        
        const videoResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`
        );
        const videoData = await videoResponse.json();
        
        if (videoData.items && videoData.items.length > 0) {
          const video = videoData.items[0];
          setVideoDetails(video);
          
          // Save to watch history
          saveToWatchHistory({
            id: { videoId: id },
            snippet: video.snippet
          });
          
          const searchQuery = video.snippet.title.split(' ').slice(0, 3).join(' ');
          const recommendedResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${searchQuery}&type=video&key=${API_KEY}`
          );
          const recommendedData = await recommendedResponse.json();
          setRecommendedVideos(recommendedData.items || []);
        }
      } catch (error) {
        console.error('Error fetching video details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideoDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const saveToWatchHistory = (video) => {
    // Get existing history
    const history = localStorage.getItem('watchHistory');
    let watchHistory = history ? JSON.parse(history) : [];
    
    // Remove duplicate if exists
    watchHistory = watchHistory.filter(item => 
      (item.id.videoId || item.id) !== (video.id.videoId || video.id)
    );
    
    // Add to beginning and limit to 50 videos
    watchHistory = [video, ...watchHistory].slice(0, 50);
    
    // Save to localStorage
    localStorage.setItem('watchHistory', JSON.stringify(watchHistory));
  };

  if (!id) {
    return (
      <div className="text-black dark:text-white">
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-2">Watch Page</h2>
          <p className="text-gray-600 dark:text-gray-400">Select a video to watch</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-black dark:text-white">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section - Video and Description */}
        <div className="flex-1">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Details */}
          {loading ? (
            <div className="mt-4 animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-4"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
            </div>
          ) : videoDetails ? (
            <div className="mt-4">
              {/* Title */}
              <h1 className="text-xl font-semibold mb-3">
                {videoDetails.snippet.title}
              </h1>

              {/* Channel Info Row */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-lg">
                  {videoDetails.snippet.channelTitle.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-base">{videoDetails.snippet.channelTitle}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {parseInt(videoDetails.statistics.viewCount).toLocaleString()} views · {' '}
                    {new Date(videoDetails.snippet.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }).replace(',', '')}
                  </div>
                </div>
              </div>

              {/* Description Box */}
              <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4">
                <div className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {parseInt(videoDetails.statistics.viewCount).toLocaleString()} views · {' '}
                  {new Date(videoDetails.snippet.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className={`text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap ${!showFullDescription ? 'line-clamp-3' : ''}`}>
                  {videoDetails.snippet.description}
                </div>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                >
                  {showFullDescription ? 'Show less' : 'Show more'}
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Right Section - Recommendations */}
        <div className="lg:w-96 shrink-0">
          <h3 className="text-lg font-semibold mb-4">Recommended</h3>
          
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex gap-2 animate-pulse">
                  <div className="w-40 h-24 bg-gray-200 dark:bg-gray-800 rounded-lg shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {recommendedVideos.map((video) => (
                <RecommendedVideo 
                  key={video.id.videoId || video.id} 
                  video={video} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
