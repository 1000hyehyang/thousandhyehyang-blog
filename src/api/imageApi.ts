import axiosInstance from './axiosInstance'

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData()

  // 한글/공백/특수문자 제거된 안전한 파일명 생성
  const safeFileName = generateSafeFileName(file.name)
  formData.append('file', file, safeFileName)

  const res = await axiosInstance.post<string>('/api/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return encodeURI(res.data) // 렌더링용으로 안전하게 인코딩
}

const generateSafeFileName = (originalName: string): string => {
  const ext = originalName.substring(originalName.lastIndexOf('.'))
  const timestamp = Date.now()
  return `image_${timestamp}${ext}`
}
