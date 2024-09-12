'use client'

import React from 'react'
import styles from '@/styles/LoginModal.module.scss'

const Login = () => {
  return (
    <div className={styles.modal_wrap}>
      <div className={styles.modal_container}>
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
          <form
            action={`/api/login`}
            method="post"
            className={styles.input_list}
          >
            <input type="email" placeholder="이메일" name="email" required />
            <input
              type="password"
              placeholder="비밀번호"
              name="password"
              required
            />
            <h4>비밀번호를 잊으셨나요?</h4>
            <button className={styles.sign_in} type="submit">
              로그인
            </button>
          </form>
        </div>
        <div className={styles.modal_right}>
          <h2>오랜만이네요!</h2>
          <p>
            나만의 계정을 만들고
            <br /> 우리와 함께해요!
          </p>
          <button type="button">회원가입</button>
        </div>
      </div>
    </div>
  )
}

export default Login
