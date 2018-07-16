const express = require('express')
const app = express()
app.get('/url/to/download.pdf', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://spray.com:5656')
  res.set('Access-Control-Allow-Credentials', true)
  res.set('Access-Control-Expose-Headers', 'Content-Disposition')
  return res.download(`${__dirname}/testt.pdf`, 'test2.pdf')
})

app.listen(5657, () => console.log('Example app listening on port 5657!'))
