const chai = require('chai');
// Tell chai that we'll be using the "should" style assertions.
chai.should();
const authMiddleware = require('./auth-middleware')

describe('authMiddleware', () => {
    it('should send 403 if there is no session', () => {

    });
});