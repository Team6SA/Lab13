'use strict';

const io = require('socket.io-client');
const readline = require('readline');
const client = require('../client');
jest.mock('readline');
jest.mock('socket.io-client');
describe('Client Tests', () => {
  let rlMock;
  beforeEach(() => {
    rlMock = {
      question: jest.fn(),
    };
    readline.createInterface.mockReturnValue(rlMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should log the current number and emit a guess when a user enters input', () => {
    const mockCurrentNumber = 42; // Replace with the desired current number
    // Mock the 'currentNumber' event from the server
    io.mockReturnValueOnce({
      on: (event, callback) => {
        if (event === 'currentNumber') {
          callback(mockCurrentNumber);
        }
      },
    });
    // Simulate user input for guessing
    const mockGuess = '23'; // Replace with the desired guess
    client.simulateInput(rlMock, mockGuess);
    // Add your expectations here
    expect(console.log).toHaveBeenCalledWith(Current Number: ${mockCurrentNumber});
    expect(rlMock.question).toHaveBeenCalledWith('Enter your guess: ', expect.any(Function));
    expect(io().emit).toHaveBeenCalledWith('guess', parseInt(mockGuess));
  });
  // Add more test cases as needed
});

