// src/api/axiosInstance.ts
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  withCredentials: true, // CORS에서 쿠키 쓰지 않더라도 Vercel-Render 통신엔 보통 true 유지
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// 요청 인터셉터 (로깅용)
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('[Request Error]', error)
    return Promise.reject(error)
  }
)

// 응답 인터셉터 (기본 에러 핸들링)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`[Response Error] ${error.response.status}: ${error.response.data}`)
    } else {
      console.error('[Network Error or CORS 문제]', error)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
