const socket = io();

let username = prompt("Enter your name:");
socket.emit('register', username);

const messagesDiv = document.getElementById('messages');
const usersDiv = document.getElementById('online-users');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('sendBtn');
const adminBtn = document.getElementById('adminBtn');
const disconnectBtn = document.getElementById('disconnectBtn');

socket.on('chatHistory', (history) => {
    history.forEach((msg) => addMessage(msg.user, msg.text));
});
socket.on('message', (msg) => {
    addMessage(msg.user, msg.text);
});

socket.on('userList', (userList) => {
    usersDiv.innerText = `Online: ${userList.join(', ') || 'None'}`;
});

sendBtn.addEventListener('click', () => {
    const text = messageInput.value.trim();
    if (text) {
        socket.emit('chatMessage', text);
        messageInput.value = '';
    }
});

adminBtn.addEventListener('click', () => {
    const text = prompt("Enter admin announcement:");
    if (text) socket.emit('adminMessage', text);
});

disconnectBtn.addEventListener('click', () => {
    socket.emit('manualDisconnect');
});

function addMessage(user, text) {
    const msg = document.createElement('div');
    msg.innerHTML = `<b>${user}:</b> ${text}`;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
