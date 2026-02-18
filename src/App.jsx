import './App.css'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import HomeScroll from './pages/HomeScroll'
import Watch from './pages/Watch'
import Upload from './pages/Upload'
import Profile from './pages/Profile'
import Search from './pages/Search'
import WatchHistory from './pages/WatchHistory'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeScroll />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/history" element={<WatchHistory />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Layout>
  )
}

export default App
