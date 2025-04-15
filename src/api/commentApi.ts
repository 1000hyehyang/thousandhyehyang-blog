import axiosInstance from './axiosInstance'

// 댓글 작성 시 전달할 요청 타입 (postId는 URL에 포함되므로 제외)
export interface CommentRequest {
  nickname: string
  emoji: string
  content: string
}

// 서버에서 반환하는 댓글 응답 타입
export interface Comment {
  id: number
  postId: number
  nickname: string
  emoji: string
  content: string
  createdAt: string
}

// 댓글 등록: POST /api/posts/{postId}/comments
export const postComment = async (
  postId: number,
  data: CommentRequest
): Promise<Comment> => {
  const res = await axiosInstance.post<Comment>(`/api/posts/${postId}/comments`, data)
  return res.data
}

// 댓글 목록 조회: GET /api/posts/{postId}/comments
export const fetchComments = async (postId: number): Promise<Comment[]> => {
  const res = await axiosInstance.get<Comment[]>(`/api/posts/${postId}/comments`)
  return res.data
}
