'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

const DetailLink: React.FC = () => {
  let router = useRouter()

  return (
    <div>
      <button
        onClick={() => {
          router.push('/')
        }}
      >
        특정 페이지 버튼
      </button>

      <button
        onClick={() => {
          router.back()
        }}
      >
        백 버튼
      </button>

      <button
        onClick={() => {
          router.forward()
        }}
      >
        앞 버튼
      </button>

      <button
        onClick={() => {
          router.refresh()
        }}
      >
        새로고침 버튼
      </button>

      <button
        onClick={() => {
          router.prefetch('/')
        }}
      >
        미리 로드 버튼
      </button>

      <Link href={'/'}>링크</Link>
      <Link href={'/'} prefetch={false}>
        링크
      </Link>
    </div>
  )
}

export default DetailLink
