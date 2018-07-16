const path = require('path')
const express = require('express')
const app = express()

app.get('/', (req, res) => res.sendFile(`${__dirname}/nocors.html`))
// app.use(express.static('../dist'))
app.use(express.static(path.join(__dirname, '../build')))
app.get('/url/to/download.pdf', (req, res) => {
  return res.download(`${__dirname}/testt.pdf`, 'test2.pdf')
  // return res.sendFile(`${__dirname}/testt.pdf`)
})

app.listen(5658, () => console.log('Example app listening on port 5658!'))
