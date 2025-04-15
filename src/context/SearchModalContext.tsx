// src/context/SearchModalContext.tsx
import React, { createContext, useContext, useState } from 'react'

interface SearchModalContextType {
  isOpen: boolean
  open: () => void
  close: () => void
}

const SearchModalContext = createContext<SearchModalContextType | undefined>(undefined)

export const SearchModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <SearchModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </SearchModalContext.Provider>
  )
}

export const useSearchModal = () => {
  const context = useContext(SearchModalContext)
  if (!context) throw new Error('useSearchModal must be used within SearchModalProvider')
  return context
}
