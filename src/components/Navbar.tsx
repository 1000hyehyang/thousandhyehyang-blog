// src/components/Navbar.tsx
import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { useSearchModal } from "../context/SearchModalContext";

interface NavbarProps {
  isOwner?: boolean;
}

const Navbar: React.FC<NavbarProps> = () => {
  const { open } = useSearchModal();

  return (
    <Wrapper>
      <Logo>🍊tech.blog</Logo>
      <Actions>
        <SearchButton onClick={open}>
          <FiSearch size={20} />
        </SearchButton>
      </Actions>
    </Wrapper>
  );
};

export default Navbar;

// ---------- 스타일 ----------
const Wrapper = styled.header`
  width: 100%;
  padding: clamp(0.75rem, 2vw, 1rem) clamp(2rem, 8vw, 4rem);
  background-color: #faf9f6;
  border-bottom: 1px solid #f3f1eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.h1`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 600;
  color: #ffb94f;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 2vw, 1rem);
`;

const SearchButton = styled.button`
  color: #6b7280;
  display: flex;
  align-items: center;

  &:hover {
    color: #374151;
  }
`;
