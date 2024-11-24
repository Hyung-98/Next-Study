import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { connectDB } from '@/app/lib/mongo';

const newUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password, dob, address, postcode } = req.body as {
      email: string;
      password: string;
      dob: Date | null;
      address: string;
      postcode: string;
    };

    if (!email || !password || !dob || !address || !postcode) {
      return res.status(400).json({ message: '필수정보를 입력해주세요.' });
    }

    try {
      // MongoDB database 연결
      const client = await connectDB;
      const db = client.db('users');
      const usersCollection = db.collection('account');

      // 기존 사용자 체크
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: '이미 사용중인 계정입니다.' });
      }

      // bcrypt를 사용하여 암호를 Hashing
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // database에 새로운 계정 추가
      await usersCollection.insertOne({
        email,
        password: hashedPassword,
        dob,
        address,
        postcode,
        createdAt: new Date()
      });

      return res.status(201).json({ message: '회원가입 완료' });
    } catch (error) {
      console.error('회원가입 오류:', error);
      return res.status(500).json({ message: '회원가입 실패' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
};

export default newUser;
