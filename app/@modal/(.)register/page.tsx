'use client'

import React, { useState } from 'react'
import axios from 'axios'
import useRegisterStore from '../../store/registerStore'
import styles from '@/styles/Register.module.scss'
import Script from 'next/script'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/locale'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    daum: any
  }
}

const RegisterPage: React.FC = () => {
  const {
    email,
    password,
    dob,
    postcode,
    address,
    setEmail,
    setPassword,
    setDob,
    setPostcode,
    setAddress,
    resetForm,
  } = useRegisterStore()

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!dob || !email || !password || !address || !postcode) {
      alert('필수입력 항목을 기재해주세요.')
      return
    }

    setLoading(true)

    const formattedDob = dob.toISOString().split('T')[0]

    try {
      const response = await axios.post('/api/register', {
        email,
        password,
        dob: formattedDob,
        address,
        postcode,
      })

      if (response.status === 201) {
        setSuccessMessage('회원가입이 성공적으로 완료되었습니다!')
        resetForm()
        router.back()
        router.back()
      }
    } catch (error) {
      setErrorMessage('정확한 정보를 입력해주세요.')
      if (error instanceof Error) alert(error.message || '회원가입 실패')
    } finally {
      setLoading(false)
    }
  }

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        let fullAddress = data.address
        let extraAddress = ''

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname
          }
          if (data.buildingName !== '') {
            extraAddress +=
              extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
        }

        setPostcode(data.zonecode)
        setAddress(fullAddress)
      },
    }).open()
  }

  return (
    <div>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
      <div className={styles.dimmed}>
        <form className={styles.register_wrap} onSubmit={handleSubmit}>
          <p className={styles.title}>회원가입</p>
          <ul className={styles.register_list}>
            <li className={styles.register_item}>
              <div className={styles.register_input}>
                <label>이메일</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </li>

            <li className={styles.register_item}>
              <div className={styles.register_input}>
                <label>비밀번호</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </li>

            <li className={styles.register_item}>
              <div className={styles.register_input}>
                <label>생년월일</label>
                <DatePicker
                  locale={ko}
                  selected={dob}
                  onChange={(date: Date | null) => setDob(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="날짜를 입력해주세요."
                  maxDate={new Date()}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                />
              </div>
            </li>

            <li className={styles.register_item}>
              <div className={styles.register_input}>
                <label>주소</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  readOnly
                  placeholder="주소"
                  required
                />
              </div>
              <button
                type="button"
                className={styles.register_address_btn}
                onClick={handleAddressSearch}
              >
                주소검색
              </button>
            </li>
            <li className={styles.register_item}>
              <div className={styles.register_input}>
                <label>우편번호</label>
                <input
                  type="text"
                  id="postcode"
                  value={postcode}
                  readOnly
                  placeholder="우편번호"
                  required
                />
              </div>
            </li>
          </ul>

          <button type="submit" className={styles.btn_reg} disabled={loading}>
            {loading ? '가입중....' : '회원가입'}
          </button>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
