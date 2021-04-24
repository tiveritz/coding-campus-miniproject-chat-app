getData();

function getData() {
    fetch('http://localhost:3000/chatdata')
    .then(response => response.json())
    .then(function(data) {
        document.querySelector('#name').innerHTML = data['name']
        document.querySelector('#messages').innerHTML = ''
    
        var messages = data['messages']
    
        for (i = messages.length-1; i >= 0; i--) {data['messages']
            var msgContainer = document.createElement("p")
            var content = document.createTextNode(messages[i])
            msgContainer.appendChild(content)
    
            document.querySelector('#messages').appendChild(msgContainer)
        }
    })
}

var messageForm = document.querySelector('#message-form')

messageForm.addEventListener('submit', function(e) {
    e.preventDefault()

    var message = {
        "message" : document.querySelector('#message').value
    }

    fetch('http://localhost:3000/newmessage', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: { "Content-Type": "application/json" }
    })

    getData()
})

//JSON.stringify({ message : "lol"})