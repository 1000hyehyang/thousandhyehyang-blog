// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import ProtectedWritePage from './pages/ProtectedWritePage'
import { SearchModalProvider, useSearchModal } from './context/SearchModalContext'
import { articles } from './data/articles'
import SearchModal from './components/SearchModal'

function AppContent() {
  const { isOpen, close } = useSearchModal()
  return (
    <>
      {/* 라우팅 페이지들 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/write" element={<ProtectedWritePage />} />
      </Routes>

      {/* 모든 페이지에서 공통으로 SearchModal 렌더링 */}
      <SearchModal isOpen={isOpen} onClose={close} articles={articles} />
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
