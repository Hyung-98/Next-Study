'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/styles/LoginModal.module.scss'

const LoginPage = () => {
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus()
    }
  }, [])

  const closeModal = () => {
    router.back()
  }

  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation()
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const email = formData.get('email')
      const password = formData.get('password')

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('token', data.token)
        // router.back()
        router.push('/dashboard')
      } else setError('로그인 정보를 정확하게 입력하세요.')
    } catch (error) {
      setError('네트워크 오류가 발생했습니다. 다시 시도해 주세요.')
    }
    setLoading(false)
  }

  const registerRoute = () => {
    router.push('/register')
  }
  return (
    <div className={styles.modal_wrap} onClick={closeModal}>
      <div className={styles.modal_container} onClick={handleModalClick}>
        <div className={styles.modal_left}>
          <h2>로그인</h2>
          <ul>
            <li>
              <button>f</button>
            </li>
            <li>
              <button>G</button>
            </li>
            <li>
              <button>Li</button>
            </li>
          </ul>
          <p>다른 계정으로 로그인</p>
          <form onSubmit={handleSubmit} className={styles.input_list}>
            <input
              type="email"
              placeholder="이메일"
              name="email"
              required
              aria-label="이메일"
            />
            <input
              type="password"
              placeholder="비밀번호"
              name="password"
              required
              aria-label="비밀번호"
            />
            <h4>비밀번호를 잊으셨나요?</h4>
            <button type="submit" className={styles.sign_in}>
              로그인
            </button>
          </form>
          {error && <p className={styles.error_message}>{error}</p>}
        </div>
        <div className={styles.modal_right}>
          <button
            className={styles.close_btn}
            type="button"
            onClick={closeModal}
            aria-label="Close Modal"
          >
            Close
          </button>
          <h2>오랜만이네요!</h2>
          <p>
            나만의 계정을 만들고
            <br /> 우리와 함께해요!
          </p>
          <button type="button" onClick={registerRoute}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
