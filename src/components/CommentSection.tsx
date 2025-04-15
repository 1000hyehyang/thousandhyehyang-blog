// src/components/CommentSection.tsx
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import { Comment, fetchComments } from '../api/commentApi'

interface Props {
  postId: number
}

const CommentSection: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    fetchComments(postId).then(setComments).catch(console.error)
  }, [postId])

  const handleAddComment = (comment: Comment) => {
    setComments((prev) => [comment, ...prev])
  }

  return (
    <Wrapper>
      <Title>댓글 {comments.length}</Title>
      <CommentForm postId={postId} onSubmit={handleAddComment} />
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
