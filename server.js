'using strict'

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3002;

const clients = {};

// Function to generate a random number between 1 and 100
function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Function to calculate the difference between the current number and a guessed number
function calculateDifference(current, guess) {
    return Math.abs(current - guess);
}

// Function to log a message to the user
function logMessage(socketId, message) {
    const socket = clients[socketId];
    if (socket) {
        socket.emit('message', message);
    }
}

let currentNumber = generateRandomNumber();

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    clients[socket.id] = socket;
    socket.emit('currentNumber', currentNumber);

    socket.on('guess', (guess) => {
        const difference = calculateDifference(currentNumber, guess);
        io.emit('newGuess', { clientId: socket.id, guess, difference });

        if (difference === 0) {
            logMessage(socket.id, 'Congratulations! You guessed the correct number.');
            currentNumber = generateRandomNumber();
            io.emit('currentNumber', currentNumber);
        } else {
            logMessage(socket.id, `You guessed ${guess}. The difference is ${difference}.`);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        delete clients[socket.id];
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = {
    generateRandomNumber,
    calculateDifference,
    logMessage,
    clients,
};