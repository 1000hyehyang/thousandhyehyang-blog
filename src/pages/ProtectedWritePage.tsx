import { useState, useEffect } from 'react'
import WritePage from './WritePage'

const ProtectedWritePage = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [inputPassword, setInputPassword] = useState('')
  const PASSWORD = import.meta.env.VITE_WRITE_PASSWORD

  useEffect(() => {
    const saved = sessionStorage.getItem('write-auth')
    if (saved === 'true') setAuthenticated(true)
  }, [])

  const handleSubmit = () => {
    if (inputPassword === PASSWORD) {
      setAuthenticated(true)
      sessionStorage.setItem('write-auth', 'true')
    } else {
      alert('비밀번호가 틀렸습니다!')
    }
  }

  if (!authenticated) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>🔐 글쓰기 권한이 필요합니다</h2>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          style={{
            padding: '0.5rem',
            marginTop: '1rem',
            fontSize: '1rem',
          }}
        />
        <br />
        <button
          onClick={handleSubmit}
          style={{
            marginTop: '1rem',
            backgroundColor: '#ffb94f',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          확인
        </button>
      </div>
    )
  }

  return <WritePage />
}

export default ProtectedWritePage
