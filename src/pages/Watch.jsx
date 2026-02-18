import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RecommendedVideo from '../components/RecommendedVideo'

export default function Watch() {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchVideoDetails() {
      try {
        const API_KEY = import.meta.env.VITE_VIDEO_API_KEY;
        
        // Fetch video details
        const videoResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`
        );
        const videoData = await videoResponse.json();
        
        if (videoData.items && videoData.items.length > 0) {
          setVideoDetails(videoData.items[0]);
          
          // Fetch recommended videos based on the current video's tags or title
          const searchQuery = videoData.items[0].snippet.title.split(' ').slice(0, 3).join(' ');
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

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span>{parseInt(videoDetails.statistics.viewCount).toLocaleString()} views</span>
                <span>•</span>
                <span>{parseInt(videoDetails.statistics.likeCount).toLocaleString()} likes</span>
              </div>

              {/* Description Box */}
              <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                    {videoDetails.snippet.channelTitle.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold">{videoDetails.snippet.channelTitle}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {new Date(videoDetails.snippet.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                  {videoDetails.snippet.description}
                </p>
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
