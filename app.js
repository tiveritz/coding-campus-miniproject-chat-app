const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const mysql = require('mysql')

app.use(cors())  // Allow cross origin resource sharing
app.use(express.static('public'))  // Serve static files
app.use(express.json())  // Parse JSON body
app.use(express.urlencoded({ extended: true })) // Get data from body

// Define path variable - creates absolute path from built-in path module
var path = require('path');

// Login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'login.html'))
})

// Chat
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'chat.html'))
})

// AJAX for chat data
app.get('/chatdata', (req, res) => {
    var response = []

    const connection = mysql.createConnection({
        host        : 'localhost',
        user        : 'chat',
        password    : 'pass',
        database    : 'chatapp'
    
    })

    try {
        connection.connect()
        connection.query('select username, message, time from messages;', function(err, result, fields) {
            if (err) { 
                throw err
            }
            Object.keys(result).forEach(function(key) {
                let row = result[key];
                let message = {
                    'username' : row.username,
                    'message' : row.message,
                    'time' : row.time
                }
                //console.log(message)
                response.push(message)
              });
        })

    } catch (error){
        console.error(error)

    } finally {
        connection.end()
    }

    console.log(response)

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
