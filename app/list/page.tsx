import Link from 'next/link'
import { connectDB } from '../utils/mongo'
import Button from '../_components/button'
import ListActions from './ListActions'

const List: React.FC = async () => {
  let db = (await connectDB).db('forum')
  let result = await db.collection('post').find().toArray()

  return (
    <div>
      <ListActions />
      <ul className="flex flex-col gap-6">
        {result.map((item, index) => (
          <li
            key={index}
            className="p-8 border-2 border-gray-200 rounded-xl shadow-md"
          >
            <Link href={`/list/detail/${item._id}`}>
              <h4 className="text-4xl font-bold">{item.title}</h4>
              <p className="mt-5 text-2xl">{item.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
