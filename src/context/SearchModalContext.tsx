// src/context/SearchModalContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getPagedPosts, Post } from '../api/postApi'

interface SearchModalContextType {
  isOpen: boolean
  open: () => void
  close: () => void
  posts: Post[]
}

const SearchModalContext = createContext<SearchModalContextType | undefined>(undefined)

export const SearchModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await getPagedPosts(0, 100) // 최대 100개 불러오기
        setPosts(res.content)
      } catch (err) {
        console.error('글 목록 불러오기 실패', err)
      }
    }
    loadPosts()
  }, [])

  return (
    <SearchModalContext.Provider value={{ isOpen, open, close, posts }}>
      {children}
    </SearchModalContext.Provider>
  )
}

export const useSearchModal = () => {
  const context = useContext(SearchModalContext)
  if (!context) throw new Error('useSearchModal must be used within SearchModalProvider')
  return context
}