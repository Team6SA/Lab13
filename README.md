# Lab13 - Closet to Number Game

This is a simple multiplayer game where multiple clients can take turns trying to guess a random number, and the player closest to the number wins. The game is facilitated by a hub server built using Node.js and Socket.IO.

## Installation

npm install

npm node

## How the Game Works

- The hub server generates a random number between 1 and 100 when a client connects and shares it with all clients.

- Clients take turns guessing the number.

- After each guess, the server broadcasts the guess and the difference between the guess and the target number to all clients.

- The client who guesses closest to the target number wins the round.

## UML

## Authors

Alejandra Altamirano & Samaad Turner