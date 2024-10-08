import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export const middleware = (req: NextRequest) => {
  const authHeader = req.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse(
      JSON.stringify({ message: '인증 토큰이 제공되지 않았습니다.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    )
  }

  const token = authHeader.split(' ')[1]

  try {
    jwt.verify(token, process.env.JWT_SECRET as string)
    return NextResponse.next()
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: '유효하지 않은 토큰입니다.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    )
  }
}

export const config = {
  matcher: ['/api/protected', '/api/secure/*'],
}
