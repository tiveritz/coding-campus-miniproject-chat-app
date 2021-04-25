const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())  // Allow cross origin resource sharing
app.use(express.static('public'))  // Serve static files
app.use(express.json())  // Parse JSON body
app.use(express.urlencoded({ extended: true })) // Get data from body

// Define path variable - creates absolute path from built-in path module
var path = require('path');

// Global application variables
var username = ''
var messages = []


// GET to '/' automatically serve index.html

// Process login form
app.post('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'chat.html'));
    username = req.body.name
})

// AJAX for chat
app.get('/chatdata', (req, res) => {
    let response  = {
        name : username,
        messages : messages
    }
    res.json(response)
})

// AJAX for sending message
app.post('/newmessage', (req, res) => {
    messages.push(req.body['message'])
    res.sendStatus(200)
})


// Start server
app.listen(port, () => {
    console.log(`Example app listening at http:// localhost:${port}`)
})
