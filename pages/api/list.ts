import { connectDB } from '@/app/utils/mongo'

const DataHandler = async (req, res) => {
  if (req.method === 'POST') {
    if (req.body.title === '') {
      return res.status(500).json('제목을 입력해 주세요.')
    }

    let db = (await connectDB).db('forum')
    let result = await db.collection('post').insertOne(req.body)
    res.redirect(302, '/list')
  }
}

export default DataHandler
