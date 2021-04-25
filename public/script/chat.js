// Build page content
getData();

function getData() {
    fetch('http://localhost:3000/chatdata')
    .then(response => response.json())
    .then(function(data) {
        document.querySelector('#name').innerHTML = data['name']
        document.querySelector('#messages').innerHTML = ''
        addMessagesToDOM(data['messages'])
    })
}

function addMessagesToDOM(messages) {
    for (i = 0; i < messages.length; i++) {
        var msgContainer = document.createElement("div")
        msgContainer.className ="msg-row msg-sent"
        var content = document.createTextNode(messages[i])
        msgContainer.appendChild(content)
        document.querySelector('#messages').appendChild(msgContainer)
    }
}

// POST new message
// To prevent the reload of the page the form uses input type button instead
// of submit
function postMessage() {
    var message = {
        "message" : document.querySelector('#msg').value
    }

    fetch('http://localhost:3000/newmessage', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: { "Content-Type": "application/json" }
    })

    getData()
}
