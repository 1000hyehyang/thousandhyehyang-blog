// src/App.tsx
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import ProtectedWritePage from './pages/ProtectedWritePage'
import { SearchModalProvider, useSearchModal } from './context/SearchModalContext'
import SearchModal from './components/SearchModal'

function AppContent() {
  const { isOpen, close, posts } = useSearchModal()

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/write" element={<ProtectedWritePage />} />
      </Routes>
      <SearchModal isOpen={isOpen} onClose={close} articles={posts} />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SearchModalProvider>
        <AppContent />
      </SearchModalProvider>
    </BrowserRouter>
  )
}

export default App
