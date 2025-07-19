const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    socket.on('new-user', username => {
        socket.username = username;
        socket.broadcast.emit('chat-message', { message: `${username} joined the chat`, user: 'System' });
    });

    socket.on('send-chat-message', message => {
        io.emit('chat-message', { message: message, user: socket.username });
    });

    socket.on('disconnect', () => {
        if(socket.username) {
            socket.broadcast.emit('chat-message', { message: `${socket.username} left the chat`, user: 'System' });
        }
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
