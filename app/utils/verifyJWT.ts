import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

// Define the shape of th JWT payload
interface JwtPayload {
  email: string
  id: string
}

export const verifyJWT = (req: NextApiRequest, res: NextApiResponse) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: '인증 토큰이 제공되지 않았습니다.' })
    throw new Error('토큰이 제공되지 않았습니다.')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload
    return decoded
  } catch (error) {
    res.status(401).json({ message: '유효하지 않은 토큰입니다.' })
    throw new Error('유효하지 않은 토큰입니다.')
  }
}
