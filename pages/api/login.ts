import { connectDB } from '@/app/lib/mongo';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

interface LoginRequest {
  email: string;
  password: string;
}

const LoginData = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '알수없는 방식의 접근입니다.' });
  }

  const { email, password }: LoginRequest = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: '올바른 이메일과 비밀번호를 입력해주세요.' });
  }

  try {
    // Connect to MongoDB
    const client = await connectDB;
    const db = client.db('users');

    // Find th user by email
    const user = await db.collection('account').findOne({ email });

    if (!user) {
      return res.status(400).json({ message: '올바른 정보를 입력해 주세요.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Compare the password with bcrypt
    if (!isPasswordValid) {
      return res.status(400).json({ message: '올바른 정보를 입력해 주세요.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h'
      }
    );

    // Successful login
    return res.status(200).json({
      message: '로그인에 성공했습니다.',
      token
    });
  } catch (error) {
    console.log('로그인 오류:', error);
    return res.status(500).json({ message: '서버 오류. 다시 시도해주세요.' });
  }
};

export default LoginData;
