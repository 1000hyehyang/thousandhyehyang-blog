// src/api/commentApi.ts
import axiosInstance from './axiosInstance'

export interface CommentRequest {
  postId: number
  nickname: string
  emoji: string
  content: string
}

export interface Comment {
  id: number
  postId: number
  nickname: string
  emoji: string
  content: string
  createdAt: string
}

export const postComment = async (data: CommentRequest): Promise<Comment> => {
  const res = await axiosInstance.post<Comment>('/api/comments', data)
  return res.data
}

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  const res = await axiosInstance.get<Comment[]>(`/api/comments/${postId}`)
  return res.data
}