// src/components/SearchModal.tsx
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FiX, FiSearch, FiClock, FiTrash2 } from 'react-icons/fi'
import { Article } from './ArticleCard'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  isOpen: boolean
  onClose: () => void
  articles: Article[]
}

const MAX_RECENTS = 5
const RECENT_KEY = 'recentSearches'

const SearchModal: React.FC<Props> = ({ isOpen, onClose, articles }) => {
  const [keyword, setKeyword] = useState('')
  const [recents, setRecents] = useState<string[]>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem(RECENT_KEY)
    if (saved) setRecents(JSON.parse(saved))
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const saveKeyword = (value: string) => {
    if (!value.trim()) return
    const newRecents = [value, ...recents.filter((r) => r !== value)].slice(0, MAX_RECENTS)
    setRecents(newRecents)
    localStorage.setItem(RECENT_KEY, JSON.stringify(newRecents))
  }

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(keyword.toLowerCase())
  )

  const handleSelect = (item: string | Article) => {
    if (typeof item === 'string') {
      setKeyword(item)
      return
    }
    saveKeyword(keyword)
    navigate(`/post/${item.id}`)
    onClose()
  }

  const clearRecents = () => {
    localStorage.removeItem(RECENT_KEY)
    setRecents([])
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Modal
            as={motion.div}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <SearchBox>
              <FiSearch size={18} />
              <Input
                ref={inputRef}
                placeholder="검색어를 입력하세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <CloseBtn onClick={onClose}><FiX size={20} /></CloseBtn>
            </SearchBox>

            {keyword === '' && recents.length > 0 && (
              <Recents>
                <RecentHeader>
                  <span>최근 검색어</span>
                  <ClearBtn onClick={clearRecents}><FiTrash2 size={14} /></ClearBtn>
                </RecentHeader>
                {recents.map((item) => (
                  <RecentItem key={item} onClick={() => handleSelect(item)}>
                    <FiClock size={14} /> {item}
                  </RecentItem>
                ))}
              </Recents>
            )}

            {keyword !== '' && (
              <Results>
                {filtered.length === 0 ? (
                  <EmptyMessage>검색 결과가 없습니다 😢</EmptyMessage>
                ) : (
                  filtered.map((item) => (
                    <ResultItem key={item.id} onClick={() => handleSelect(item)}>
                      <Thumb src={item.thumbnail} />
                      <Text>{item.title}</Text>
                    </ResultItem>
                  ))
                )}
              </Results>
            )}
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  )
}

export default SearchModal

// ---------- 스타일 ----------
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`

const Modal = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 640px;
  width: 90%;
  margin: 10vh auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  gap: 0.5rem;
`

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`

const CloseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  padding: 0.25rem;
  color: #6b7280;
`

const Results = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }
`

const Thumb = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 0.5rem;
  object-fit: cover;
`

const Text = styled.div`
  font-size: 0.95rem;
  color: #111827;
`

const EmptyMessage = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  text-align: center;
  padding: 2rem 0;
`

const Recents = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const RecentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #6b7280;
`

const RecentItem = styled.div`
  font-size: 0.95rem;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    color: #ffa726;
  }
`

const ClearBtn = styled.button`
  color: #9ca3af;
  &:hover {
    color: #ef4444;
  }
`
