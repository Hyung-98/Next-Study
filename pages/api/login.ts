import { connectDB } from '@/app/utils/mongo'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

const LoginData = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { _id, email, password } = req.body

    if (!email || !password)
      return res.status(500).json('올바른 이메일과 비밀번호를 입력해주세요.')

    try {
      const db = (await connectDB).db('users')
      const result = await db.collection('account').findOne({ email: new ObjectId(email) })

      if (Object.keys(result).length === 0)
    } catch (error) {
      return res.status(405).end(`${req.method} ${error}`)
    }
  }
}

export default LoginData
