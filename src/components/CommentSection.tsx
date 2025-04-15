import { useState } from 'react'
import styled from 'styled-components'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

export interface Comment {
  id: number
  nickname: string
  content: string
  emoji: string
}

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([])

  const handleAddComment = (comment: Comment) => {
    setComments((prev) => [comment, ...prev])
  }

  return (
    <Wrapper>
      <Title>댓글 {comments.length}</Title>
      <CommentForm onSubmit={handleAddComment} />
      <CommentList comments={comments} />
    </Wrapper>
  )
}

export default CommentSection

const Wrapper = styled.section`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
`

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
`
