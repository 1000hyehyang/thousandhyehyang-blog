import React from 'react'
import styled from 'styled-components'
import { Comment } from './CommentSection'

interface Props {
  comments: Comment[]
}

const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <ListWrapper>
      {comments.map((comment) => (
        <CommentItem key={comment.id}>
          <Header>
            <Emoji>{comment.emoji}</Emoji>
            <Nickname>{comment.nickname}</Nickname>
          </Header>
          <Text>{comment.content}</Text>
        </CommentItem>
      ))}
    </ListWrapper>
  )
}

export default CommentList

// ---------- 스타일 ----------
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const CommentItem = styled.div`
  background-color: #faf9f6;
  padding: 1rem;
  border-radius: 12px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

const Emoji = styled.span`
  font-size: 1.4rem;
`

const Nickname = styled.span`
  font-weight: 500;
  color: #374151;
`

const Text = styled.p`
  font-size: 0.95rem;
  color: #111827;
  line-height: 1.5;
`
