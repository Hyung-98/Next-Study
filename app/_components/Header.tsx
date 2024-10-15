'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { jwtDecode } from 'jwt-decode'
import Button from './button'
import styles from '@/styles/Header.module.scss'

interface DecodedToken {
  email: string
  id: string
  exp: number
}

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token') // localStorage에 있는 토큰 삭제
    setIsAuthenticated(false) // 인증정보가 없기때문에 false로 set
    router.push('/') // 로그아웃 되었을때 메인페이지로 이동
  }

  useEffect(() => {
    // localStorage에 있는 토큰을 가져온다.
    const token = localStorage.getItem('token')

    if (token) {
      try {
        // 클라이언트에서 토큰을 디코딩하여 유효성(예: 만료일)을 확인한다.
        const decoded: DecodedToken = jwtDecode(token)

        if (decoded.exp * 1000 > Date.now()) {
          // 토큰이 아직 살아있다면 인증정보 true
          setIsAuthenticated(true)
        } else {
          // 토큰이 만료되었다면 localStorage에서 토큰 삭제
          localStorage.removeItem('token')
          // 인증 false
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('토큰이 만료:', error)
        setIsAuthenticated(false)
      }
    } else {
      // 토큰이 없을때 인증 false
      setIsAuthenticated(false)
    }
  }, []) // 컴퍼넌트가 마운트되었을때 한번만 실행한다.

  const handleLoginClick = () => {
    router.push('/login')
  }

  const handleMyPageClick = () => {
    router.push('/mypage')
  }

  return (
    <div className={styles.header}>
      <nav>
        <ul>
          <li>
            <Link href="/" scroll={false}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/list" scroll={false}>
              List
            </Link>
          </li>
        </ul>
      </nav>
      {isAuthenticated ? (
        <>
          <button onClick={handleMyPageClick}>마이페이지</button>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <Button
            classes="bg-sky-700"
            text="로그인"
            onClick={handleLoginClick}
          />
        </>
      )}
    </div>
  )
}

export default Header
