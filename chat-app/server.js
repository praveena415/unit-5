const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let users = {}; 
let messages = []; 

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('register', (username) => {
        users[socket.id] = username;
        console.log(`${username} joined the chat`);
        io.emit('userList', Object.values(users));
        socket.emit('chatHistory', messages);
        io.emit('message', { user: 'Admin', text: `${username} joined the chat!` });
    });

    socket.on('chatMessage', (data) => {
        const msg = { user: users[socket.id], text: data };
        messages.push(msg);
        io.emit('message', msg);
    });

    socket.on('adminMessage', (text) => {
        const msg = { user: 'Admin', text };
        messages.push(msg);
        io.emit('message', msg);
    });

    socket.on('manualDisconnect', () => {
        socket.disconnect(true);
    });
    socket.on('disconnect', () => {
        const username = users[socket.id];
        if (username) {
            console.log(`${username} disconnected`);
            delete users[socket.id];
            io.emit('userList', Object.values(users));
            io.emit('message', { user: 'Admin', text: `${username} left the chat.` });
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
