import React from 'react'
import { connectDB } from '../../../utils/mongo'
import { ObjectId } from 'mongodb'

const Modify: React.FC = async (props) => {
  let db = (await connectDB).db('forum')
  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(props.params.id) })

  return (
    <div>
      <h4>글수정</h4>
      <form action="/api/modify" method="POST" className="flex flex-col gap-3">
        <input type="hidden" name="_id" defaultValue={result._id.toString()} />
        <input
          className="border-2 bg-gray-100 w-2/5"
          placeholder="제목을 입력해주세요."
          type="text"
          name="title"
          defaultValue={result.title}
        />
        <textarea
          className="border-2 bg-gray-100 w-2/5"
          placeholder="내용을 입력해주세요."
          name="content"
          defaultValue={result.content}
        ></textarea>
        <button
          className="w-fit px-6 py-2 bg-sky-400 text-xl font-semibold text-white"
          type="submit"
        >
          전송
        </button>
      </form>
    </div>
  )
}

export default Modify
