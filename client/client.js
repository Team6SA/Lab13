'using strict';

// module is used to create an interface for reading stuff from command line
const readline = require('readline');
const io = require('socket.io-client'); // socket connection to the server
const socket = io('http://localhost:3000'); // Connect to our server's URL
// this creates an object, 'rl' that is used to prompt the user for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// Listen for the current number from the server. Once currentNumber (our payload) is given, that number is logged in the console
socket.on('currentNumber', (currentNumber) => {
  console.log(`Current Number: ${currentNumber}`);
  // The user is now asked to guess for the number
  rl.question('Enter your guess: ', (guess) => {
    // that guessed number is emitted to the server
    socket.emit('guess', parseInt(guess));
  });
});
// When the server receives a guess from a client, it emits a newGuess event to everyone connected.
// The callback logs the client (by the clientID), the guess number, and how far off the guess was from the currentNumber 
socket.on('newGuess', ({ clientId, guess, difference }) => {
  console.log(`Client ${clientId} guessed ${guess}, difference: ${difference}`);
});
// Once all that is done, the server listens for a discconect. Once recieved, the callback logs the message to the user 
socket.on('disconnect', () => {
  console.log('Disconnected from the server.');
  // ability to prompt new question is stopped
  rl.close();
});
// server also listens for an error event. If recieved it'll log that an error has happened
socket.on('error', (error) => {
  console.error('An error occurred:', error);
  // ability to prompt new question is stopped
  rl.close();
});