// Build page content
refreshChatData();
writeTimeToDOM()

let username = sessionStorage.getItem('username')
document.querySelector('#name').innerHTML = username


// Refresh chat and time periodically
window.setInterval(function() {
    writeTimeToDOM()
    refreshChatData();
    scrollToChatBottom()
}, 10000)

function scrollToChatBottom() {
    // Scroll to bottom of chat
    let chat = document.querySelector('#main-wrapper');
    chat.scrollTop = chat.scrollHeight;
}

function writeTimeToDOM() {
    let now = new Date()
    let h = (now.getHours() < 10 ? '0' : '') + now.getHours()
    let m = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes()
    let s = (now.getSeconds() < 10 ? '0' : '') + now.getSeconds()
    let time = h + ':' + m + ':' + s
    
    document.querySelector('#refresh-time').innerHTML = time;
}

function refreshChatData() {
    fetch('http://localhost:3000/chatdata')
    .then(response => response.json())
    .then(function(data) {
        document.querySelector('#messages').innerHTML = ''
        addMessagesToDOM(data)
    })
}

function addMessagesToDOM(messages) {
    for (i = 0; i < messages.length; i++) {
        var msgContainer = document.createElement("div")
        msgContainer.className ="msg-row msg-sent"
        var content = document.createTextNode(messages[i]['message'])
        msgContainer.appendChild(content)
        document.querySelector('#messages').appendChild(msgContainer)
    }
}

// POST new message
// To prevent the reload of the page the form uses input type button instead
// of submit
function postMessage() {
    var message = {
        "message" : document.querySelector('#msg').value,
        "name" : username
    }

    fetch('http://localhost:3000/newmessage', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: { "Content-Type": "application/json" }
    }).then(function(data) {
        refreshChatData()
    })
}
