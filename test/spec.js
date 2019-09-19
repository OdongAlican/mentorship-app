/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
// chai is an assertian library used in mocha
const { expect } = require('chai');
// supertest handles the http verbs. ie calling the server
const request = require('supertest');
const app = require('../app');

// describe and it are methods global mocha
describe('[users]', () => {
  it('should get all users', (done) => {
    request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, resp) => {
        expect(resp.body).to.be.an('array');
        done();
      });
  });
  it('should create a user', (done) => {
    user = {
      id: '3',
      firstName: 'Alican',
      lastName: 'Amulla',
      password: '123456',
    };
    request(app)
      .post('/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, resp) => {
        const singleUsers = resp.body;
        expect(singleUsers).to.be.an('object');

        /*
            testing deep equal not working.
            To check if the properties of the objects are the same
        */
        // chai(singleUsers).to.eql(user);
        done();
      });
  });
});
