// src/api/postApi.ts
import axiosInstance from './axiosInstance'

export interface CreatePostPayload {
  title: string
  category: string
  content: string
  tags: string
  thumbnailUrl: string
}

export const createPost = async (payload: CreatePostPayload): Promise<number> => {
  const res = await axiosInstance.post<{ data: number }>('/api/posts', payload)
  return res.data.data
}

export interface Post {
  id: number
  title: string
  category: string
  content: string
  tags: string
  thumbnailUrl: string
  createdAt: string
}

export interface PagedPostResponse {
  content: Post[]
  totalPages: number
  currentPage: number
  totalElements: number
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

export const getPagedPosts = async (
  page: number,
  size: number,
  category?: string
): Promise<PagedPostResponse> => {
  const res = await axiosInstance.get<ApiResponse<PagedPostResponse>>('/api/posts/paged', {
    params: {
      page,
      size,
      ...(category && category !== '전체' ? { category } : {}),
    },
  })
  return res.data.data
}

export const getPostById = async (id: number): Promise<Post> => {
  const res = await axiosInstance.get<ApiResponse<Post>>(`/api/posts/${id}`)
  return res.data.data
}
