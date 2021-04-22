const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('./public/index.html')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
