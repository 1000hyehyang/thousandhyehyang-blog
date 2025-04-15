import React from 'react'
import styled from 'styled-components'

interface TrendingPost {
  id: number
  title: string
  author: string
}

interface Props {
  posts: TrendingPost[]
}

const TrendingPosts: React.FC<Props> = ({ posts }) => {
  return (
    <Wrapper>
      <Title>인기글</Title>
      <List>
        {posts.map((post) => (
          <Item key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <Author>{post.author}</Author>
          </Item>
        ))}
      </List>
    </Wrapper>
  )
}

export default TrendingPosts

// ---------- 스타일 ----------
const Wrapper = styled.section`
  width: 100%;
  padding: 1rem 0;
  border-left: 1px solid #e5e7eb;
  padding-left: 1.5rem;
`

const Title = styled.h2`
  font-size: 0.95rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 1rem;
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
`

const Item = styled.li`
  cursor: pointer;

  &:hover h3 {
    text-decoration: none;
    color: #ffa726;
  }
`

const PostTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 500;
  color: #111827;
  line-height: 1.4;
`

const Author = styled.span`
  font-size: 0.85rem;
  color: #6b7280;
`
