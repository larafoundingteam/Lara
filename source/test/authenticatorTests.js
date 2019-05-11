const chai = require('chai');
const user = require('../authenticator');

const { expect } = chai;

describe('Users Route Unit Tests', () => {
  describe('IsValidUser Tests', () => {
    it('returns True for admin', done => {
      expect(user.isAuthorizedUser('admin')).to.be.equal(true);

      done();
    });

    it('returns False for invalidUser', done => {
      expect(user.isAuthorizedUser('UnknownUser')).to.be.equal(true);
      done();
    });
  });
});
