const handler = (req, res) => {
  let newDate = new Date()

  let year = newDate.getFullYear()
  let month = newDate.getMonth() + 1
  let day = newDate.getDay()
  let hour = newDate.getHours()
  let min = newDate.getMinutes()
  let sec = newDate.getSeconds()

  let today = `${year}년 ${month}월 ${day}일`
  let time = `${hour}시 ${min}분 ${sec}초`

  if (req.method == 'GET') {
    res.status(200).json(`오늘 날짜: ${today} 현재 시간: ${time}`)
  }
  if (req.method == 'POST') {
    res.status(200).json(`오늘 날짜: ${today} 현재 시간: ${time}`)
  }
}

export default handler
