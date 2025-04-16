// src/components/ArticleCard.tsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export interface Article {
  id: number;
  title: string;
  description: string;
  date: string;
  author: string;
  thumbnail: string;
  category: string;
}

const ArticleCard: React.FC<Article> = ({
  id,
  title,
  description,
  date,
  author,
  thumbnail,
}) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/post/${id}`)}>
      <Content>
        <TextBlock>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Meta>
            {date} · {author}
          </Meta>
        </TextBlock>
        <ThumbnailWrapper>
          <Thumbnail src={thumbnail} alt={title} />
        </ThumbnailWrapper>
      </Content>
    </Card>
  );
};

export default ArticleCard;

// ---------- 스타일 ----------
const Card = styled.article`
  padding: 1.5rem 0;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;

  &:hover h3 {
    color: #ffa726;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TextBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: clamp(1.05rem, 1.5vw, 1.25rem);
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
  line-height: 1.5;
  transition: color 0.2s ease;
`;

const Description = styled.p`
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  color: #6b7280;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const Meta = styled.span`
  font-size: clamp(0.75rem, 1vw, 0.85rem);
  color: #9ca3af;
`;

const ThumbnailWrapper = styled.div`
  width: clamp(96px, 16vw, 160px);
  height: clamp(60px, 10vw, 100px);
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 640px) {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9; // 모바일에선 비율 유지하면서 자동 크기
    margin-top: 1rem;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
  transform-origin: center center;
`;
