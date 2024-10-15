import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyJWT } from '@/app/utils/verifyJWT'

const JWTAuthHandler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const decodedToken = verifyJWT(req, res)

    return res.status(200).json({
      message: '인증된 사용자만 접근 가능합니다.',
      user: decodedToken,
    })
  } catch (error) {
    // Error handled in verifyJWT function
  }

  // res.status(405).json({ message: 'Method not allowed' })
}

export default JWTAuthHandler
