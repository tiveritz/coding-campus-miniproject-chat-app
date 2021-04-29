function login() {
    let name = document.querySelector('#name').value
    sessionStorage.setItem('username', name);
    window.location = "http://localhost:3000/chat"
}
