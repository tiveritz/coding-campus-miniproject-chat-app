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
var messages = []

// Login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'login.html'));
    username = req.body.name
})

// Chat
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'chat.html'));
})

// AJAX for chat data
app.get('/chatdata', (req, res) => {
    let response  = {
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
    console.log(`Example app listening at http://localhost:${port}`)
})
