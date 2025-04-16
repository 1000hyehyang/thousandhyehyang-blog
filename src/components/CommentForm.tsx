import { useState } from 'react'
import styled from 'styled-components'
import { postComment, Comment } from '../api/commentApi'
import { emojis, nicknames } from './commentMeta'

interface Props {
  postId: number
  onSubmit: (comment: Comment) => void
}

const CommentForm: React.FC<Props> = ({ postId, onSubmit }) => {
  const [nickname, setNickname] = useState(randomNickname())
  const [emoji, setEmoji] = useState(randomEmoji())
  const [content, setContent] = useState('')

  const handleSubmit = async () => {
    if (!content.trim()) return
    try {
      const newComment = await postComment(postId, {
        nickname,
        emoji,
        content: content.trim(),
      })
      onSubmit(newComment)
      setContent('')
    } catch {
      alert('댓글 등록 실패')
    }
  }

  const handleRandomize = () => {
    setNickname(randomNickname())
    setEmoji(randomEmoji())
  }

  return (
    <FormWrapper>
      <NicknameBox>
        <Emoji>{emoji}</Emoji>
        <Nickname>{nickname}</Nickname>
        <RandomBtn onClick={handleRandomize}>랜덤 변경</RandomBtn>
      </NicknameBox>
      <TextArea
        placeholder="입력한 댓글은 수정하거나 삭제할 수 없어요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />
      <SubmitButton onClick={handleSubmit}>댓글 남기기</SubmitButton>
    </FormWrapper>
  )
}

export default CommentForm

const randomNickname = () => nicknames[Math.floor(Math.random() * nicknames.length)]
const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)]

// ---------- 스타일 ----------
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`

const NicknameBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Emoji = styled.span`
  font-size: 1.5rem;
`

const Nickname = styled.span`
  font-weight: 500;
`

const RandomBtn = styled.button`
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  background: #f3f4f6;
  border-radius: 6px;

  &:hover {
    background-color: #e5e7eb;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  background-color: #faf9f6;
  color: #111827;
  line-height: 1.5;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  resize: none;

  &:focus {
    outline: none;
    border-color:rgb(252, 200, 124);
  }
`

const SubmitButton = styled.button`
  align-self: flex-end;
  background-color: #ffb94f;
  color: #faf9f6;
  padding: 0.5rem 1.25rem;
  font-size: 0.9rem;
  border-radius: 6px;
  font-weight: 500;

  &:hover {
    background-color: #ffa726;
  }
`
