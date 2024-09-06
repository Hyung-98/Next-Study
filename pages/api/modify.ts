import { connectDB } from '@/app/utils/mongo'
import { ObjectId } from 'mongodb'

const DataHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { _id, title, content } = req.body

    // 입력값 유효성 검사
    if (!_id || !title) {
      return res.status(500).json('필수 필드를 입력해 주세요.')
    }

    // _id 값이 문자열로 전달되므로, ObjectId로 변환
    const objectId = new ObjectId(_id)

    let db = (await connectDB).db('forum')
    let result = await db
      .collection('post')
      .updateOne(
        { _id: objectId },
        { $set: { title: title, content: content } },
      )
    res.redirect(302, '/list')
  }
}

export default DataHandler
