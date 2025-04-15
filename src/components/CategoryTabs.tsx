// src/components/CategoryTabs.tsx
import React from 'react'
import styled from 'styled-components'

const tabs = ['전체', '개발', '데이터/ML', '디자인']

interface Props {
  selected: string
  onSelect: (tab: string) => void
}

const CategoryTabs: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <TabList>
      {tabs.map((tab) => (
        <Tab
          key={tab}
          $active={selected === tab}
          onClick={() => onSelect(tab)}
        >
          {tab}
        </Tab>
      ))}
    </TabList>
  )
}

export default CategoryTabs

// ---------- 스타일 ----------
const TabList = styled.div`
  display: flex;
  gap: clamp(1rem, 4vw, 2rem);
  margin-bottom: clamp(1rem, 4vw, 2rem);
`

const Tab = styled.div<{ $active: boolean }>`
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) => ($active ? '#111827' : '#6b7280')};
  position: relative;
  cursor: pointer;
  padding-bottom: 0.25rem;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    height: 2px;
    width: ${({ $active }) => ($active ? '100%' : '0')};
    background-color: #ffb94f;
    transition: width 0.3s;
  }
`
