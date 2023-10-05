const {generateRandomNumber, calculateDifference, logMessage, clients} = require('./server.js'); 
  
  describe('generateRandomNumber', () => {
    it('generates a random number between 1 and 100', () => {
      const randomNumber = generateRandomNumber();
      expect(randomNumber).toBeGreaterThanOrEqual(1);
      expect(randomNumber).toBeLessThanOrEqual(100);
    });
  });
  
  describe('calculateDifference', () => {
    it('calculates difference between two numbers', () => {
      const difference = calculateDifference(10, 5);
      expect(difference).toBe(5);
    });
  });
  
  describe('logMessage', () => {
    let mockSocket;
    beforeEach(() => {
       mockSocket = {
            emit: jest.fn(),
          };
          clients['socketId123'] = mockSocket;
    })
    it('logs a message to the user', () => {

  
      logMessage('socketId123', 'Test message');
  
      expect(mockSocket.emit).toHaveBeenCalledWith('message', 'Test message');

    });
    afterEach(() => {
        delete clients['socketId123'];
    })
  });
  
