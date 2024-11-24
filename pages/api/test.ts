const handler = (req, res) => {
  if (req.method == 'GET') {
    res.status(200).json('GET 처리완')
  }
  if (req.method == 'POST') {
    res.status(200).json('POST 처리완')
  }
}

export default handler
