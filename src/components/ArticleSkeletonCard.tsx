// src/components/ArticleSkeletonCard.tsx
import styled, { keyframes } from 'styled-components'

const ArticleSkeletonCard = () => {
  return (
    <Card>
      <Content>
        <TextBlock>
          <SkeletonTitle />
          <SkeletonText />
          <SkeletonMeta />
        </TextBlock>
        <ThumbnailWrapper>
          <SkeletonThumbnail />
        </ThumbnailWrapper>
      </Content>
    </Card>
  )
}

export default ArticleSkeletonCard

// ---------- 스타일 ----------
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

const SkeletonBase = styled.div`
  background: #e0e0e0;
  background-image: linear-gradient(
    to right,
    #e0e0e0 0%,
    #f5f5f5 20%,
    #e0e0e0 40%,
    #e0e0e0 100%
  );
  background-repeat: no-repeat;
  background-size: 1000px 100%;
  display: inline-block;
  animation: ${shimmer} 1.2s linear infinite;
  border-radius: 4px;
`

const Card = styled.article`
  padding: 1.5rem 0;
  border-bottom: 1px solid #e5e7eb;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
`

const TextBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const SkeletonTitle = styled(SkeletonBase)`
  width: 70%;
  height: 1.4rem;
`

const SkeletonText = styled(SkeletonBase)`
  width: 90%;
  height: 1rem;
`

const SkeletonMeta = styled(SkeletonBase)`
  width: 40%;
  height: 0.9rem;
`

const ThumbnailWrapper = styled.div`
  width: clamp(96px, 12vw, 112px);
  height: clamp(60px, 8vw, 72px);
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
`

const SkeletonThumbnail = styled(SkeletonBase)`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
`
