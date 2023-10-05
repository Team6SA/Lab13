const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3002;

const clients = {};

let currentNumber = Math.floor(Math.random() * 100);

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    clients[socket.id] = socket;
    socket.emit('currentNumber', currentNumber);
    socket.on('guess', (guess) => {
        const difference = Math.abs(guess - currentNumber);
        io.emit('newGuess', { clientId: socket.id, guess, difference });
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        deletenclients[socket.id];
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});