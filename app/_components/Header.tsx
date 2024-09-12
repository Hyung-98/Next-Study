'use client'

import React from 'react'
import Link from 'next/link'
import Button from './button'
import styles from '@/styles/Header.module.scss'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()

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
      <Button
        classes="bg-sky-700"
        text="로그인"
        onClick={() => {
          router.push('/login')
        }}
      />
    </div>
  )
}

export default Header
