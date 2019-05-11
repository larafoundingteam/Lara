const request = require('supertest');
const chai = require('chai');
const app = require('../app');

const { expect } = chai;
describe('Users Integration tests', () => {
  describe('Post /users', () => {
    it('Valid user attempt to authenticate', done => {
      request(app)
        .post('/users')
        .send({ username: 'admin' })
        .end((err, res) => {
          expect(res.body.status).to.be.equal('Authorized');
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
    it('Attempt to authenticate bad user', done => {
      request(app)
        .post('/users')
        .send({ username: 'BadUser' })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(403);
          done();
        });
    });
    it('Make a post without the required username field', done => {
      request(app)
        .post('/users')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });
});
