import { connectDB } from './utils/mongo'

const Home: React.FC = async () => {
  let db = (await connectDB).db('forum')
  let result = await db.collection('post').find().toArray()

  return <main>{result[0].title}</main>
}

export default Home
