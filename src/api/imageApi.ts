// src/api/imageApi.ts
import axiosInstance from './axiosInstance'

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)

  const res = await axiosInstance.post<string>('/api/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}