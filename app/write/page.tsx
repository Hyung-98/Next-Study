import React from 'react'

const Write: React.FC = () => {
  return (
    <div>
      <h4>글작성</h4>
      <form action="/api/list" method="POST" className="flex flex-col gap-3">
        <input
          className="border-2 bg-gray-100 w-2/5"
          placeholder="제목을 입력해주세요."
          type="text"
          name="title"
        />
        <textarea
          className="border-2 bg-gray-100 w-2/5"
          placeholder="내용을 입력해주세요."
          name="content"
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

export default Write
