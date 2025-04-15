// src/components/Pagination.tsx
import React from 'react'
import styled from 'styled-components'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages: (number | string)[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)

      if (currentPage > 3) pages.push('...')

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) pages.push(i)

      if (currentPage < totalPages - 2) pages.push('...')

      pages.push(totalPages)
    }

    return pages
  }

  return (
    <Wrapper>
      <IconButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <HiChevronLeft size={20} />
      </IconButton>

      {getPages().map((p, i) =>
        typeof p === 'number' ? (
          <Page
            key={i}
            $active={p === currentPage}
            onClick={() => onPageChange(p)}
          >
            {p}
          </Page>
        ) : (
          <Dots key={i}>•••</Dots>
        )
      )}

      <IconButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <HiChevronRight size={20} />
      </IconButton>
    </Wrapper>
  )
}

export default Pagination

// ---------- 스타일 ----------
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 3rem;
  font-size: 1rem;
  user-select: none;
`

const Page = styled.button<{ $active: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? '#e5e7eb' : 'transparent')};
  color: ${({ $active }) => ($active ? '#111827' : '#6b7280')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  text-align: center;

  &:hover {
    background-color: #f1f5f9;
  }
`

const Dots = styled.span`
  color: #6b7280;
  padding: 0 0.25rem;
`

const IconButton = styled.button<{ disabled: boolean }>`
  color: ${({ disabled }) => (disabled ? '#d1d5db' : '#6b7280')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #374151;
  }
`
