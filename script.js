const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

const username = prompt("Enter your username:");
socket.emit('new-user', username);

socket.on('chat-message', data => {
    const item = document.createElement('div');
    item.textContent = `${data.user}: ${data.message}`;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});

form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value) {
        socket.emit('send-chat-message', input.value);
        input.value = '';
    }
});
