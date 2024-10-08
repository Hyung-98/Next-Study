'use client'

import React, { useState } from 'react'
import styles from '@/styles/LoginModal.module.scss'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [error, setError] = useState('')
  const router = useRouter()

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

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) router.push('/')
    else if (!res.ok) setError('로그인 정보를 정확하게 입력하세요.')
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

export default Login
