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
    const connection = mysql.createConnection({
        host        : 'localhost',
        user        : 'chat',
        password    : 'pass',
        database    : 'chatapp'
    })

    try {
        let response = []
        connection.connect()
        connection.query('select username, message, time from messages;', function(err, result, fields) {

            Object.keys(result).forEach(function(i) {
                let row = result[i]
                
                response[i] = {
                    'username' : row.username,
                    'message' : row.message,
                    'time' : row.time
                }
            })
            res.json(response)
        })

    } catch (error){
        console.error(error)
        res.sendStatus(500)

    } finally {
        connection.end()
    }
})

// AJAX for sending message
app.post('/newmessage', (req, res) => {
    let message = req.body['message']
    let name = req.body['name']
    const connection = mysql.createConnection({
        host        : 'localhost',
        user        : 'chat',
        password    : 'pass',
        database    : 'chatapp'
    })

    try {
        let response = []
        connection.connect()
        connection.query('insert into messages (username,message) values ("' + name +'","' + message + '")', function(err, result, fields) {
        })
    } catch (error){
        console.error(error)
        res.sendStatus(500)

    } finally {
        connection.end()
    }
    res.sendStatus(200)
})


// Start server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
