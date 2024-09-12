import { connectDB } from '@/app/utils/mongo'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

const DataHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { _id, title, content } = req.body

    // 입력값 유효성 검사
    if (!_id || !title) {
      return res.status(500).json('필수 필드를 입력해 주세요.')
    }

    try {
      // _id 값이 문자열로 전달되므로, ObjectId로 변환
      const objectId = new ObjectId(_id)

      let db = (await connectDB).db('forum')
      let result = await db
        .collection('post')
        .updateOne({ _id: objectId }, { $set: { title, content } })

      if (result.modifiedCount === 0) {
        return res
          .status(400)
          .json({ message: '업데이트할 문서를 찾을 수 없습니다.' })
      }

      // return res.status(200).json({ message: '업데이트 성공' })
      return res.redirect(302, '/list')
    } catch (error) {
      res.status(500).json({ message: '서버 오류' + error })
    }
  } else {
    // 다른 HTTP 메소드 처리
    res.setHeader('Allow', ['post'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default DataHandler
