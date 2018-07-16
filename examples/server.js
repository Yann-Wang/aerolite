const path = require('path')
const express = require('express')
const app = express()

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))
// app.use(express.static('../dist'))
app.use(express.static(path.join(__dirname, '../build')))

app.listen(5656, () => console.log('Example app listening on port 5656!'))
