# Streamix

A video streaming platform that brings the YouTube experience to life with a clean, modern interface. Built as a learning project to explore React patterns, API integration, and real-world application development.

## What This Project Does

Streamix lets you browse, search, and watch videos using YouTube's Data API. Think of it as a simplified YouTube client with all the core features you'd expect: search functionality, video playback, personalized history tracking, and a smooth dark mode for those late-night browsing sessions.

The project focuses on delivering a responsive, fast user experience while demonstrating modern React development practices. It's built with Vite for lightning-fast development and uses Tailwind CSS for styling without the bloat.

## Key Features

**Video Browsing**: Browse through videos with category filters like Music, Gaming, News, and more. The home page displays 24 videos per page with smooth pagination.

**Search System**: Search for any video topic with a smart search history feature that remembers your last 10 searches. The search is persistent across page refreshes using localStorage.

**Watch History**: Every video you watch is automatically saved to your watch history (up to 50 videos). You can clear individual videos or wipe the entire history whenever you want.

**Theme Toggle**: Switch between dark and light modes. Your preference is saved locally, so it persists between sessions.

**Video Recommendations**: When watching a video, you'll see recommended videos in the sidebar based on related content.

## Getting Started

### Prerequisites

You'll need a YouTube Data API key to make this work. Don't worry, it's free and takes about 5 minutes to set up:

1. Head to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project (or use an existing one)
3. Enable the YouTube Data API v3
4. Create credentials (API key)
5. Copy your API key

### Setup Instructions

First, clone the repository and install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and add your API key:

```env
VITE_VIDEO_API_KEY=your_youtube_api_key_here
```

Note: The `.env` file is already in `.gitignore`, so your API key won't accidentally get pushed to GitHub.

Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:5173`. You should see the home page with videos loading from YouTube.

### Building for Production

When you're ready to deploy, build the production version:

```bash
npm run build
```

This creates an optimized build in the `dist` folder. You can preview it locally with:

```bash
npm run preview
```

## Deploying to Vercel

This project is configured for one-click deployment on Vercel. Here's how:

1. Push your code to GitHub (the `.env` file is excluded automatically)
2. Go to [Vercel](https://vercel.com) and import your repository
3. Vercel will detect it's a Vite project automatically
4. Add your environment variable in the project settings:
   - Name: `VITE_VIDEO_API_KEY`
   - Value: Your YouTube API key
   - Make sure to add it for all environments (Production, Preview, Development)
5. Click deploy and wait for the build to finish

The `vercel.json` configuration file handles client-side routing, so refreshing on any page will work correctly.

See the [DEPLOYMENT.md](DEPLOYMENT.md) file for more detailed deployment instructions and troubleshooting tips.

## Tech Stack

This project uses modern web development tools:

- **React 19**: The latest version with improved hooks and performance
- **Vite 7**: Super fast build tool and development server
- **Tailwind CSS 4**: Utility-first CSS framework for rapid UI development
- **React Router DOM**: Client-side routing for seamless navigation
- **React Icons**: Icon library with thousands of icons
- **YouTube Data API v3**: Source for all video data

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx           # Main layout with sidebar
│   ├── Navbar.jsx           # Top navigation with search
│   ├── Sidebar.jsx          # Side navigation menu
│   ├── VideoCard.jsx        # Video thumbnail cards
│   ├── ShimmerCard.jsx      # Loading skeleton
│   ├── Pagination.jsx       # Page navigation
│   ├── SearchHistory.jsx    # Search history dropdown
│   └── RecommendedVideo.jsx # Video recommendations
├── pages/
│   ├── Home.jsx             # Main landing page
│   ├── Watch.jsx            # Video player page
│   ├── Search.jsx           # Search results page
│   ├── WatchHistory.jsx     # Watch history page
│   ├── Upload.jsx           # Upload page (placeholder)
│   └── Profile.jsx          # Profile page (placeholder)
├── App.jsx                  # Router configuration
└── main.jsx                 # Application entry point
```

## Notes and Limitations

- The YouTube Data API has a daily quota limit. If you're running into quota errors, you might need to wait until the next day or request a quota increase.
- Video recommendations currently use a keyword-based search approach. For better recommendations, you could switch to YouTube's `relatedToVideoId` parameter.
- Upload and Profile pages are placeholders for now. These would require additional backend infrastructure and authentication.

## License

MIT License - feel free to use this project for learning or as a starting point for your own applications.
