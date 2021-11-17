process.env.NODE_ENV = 'test';

const expect = require("chai").expect; 
const request = require("supertest")
const app = require("../app.js");
const { response } = require("express");

// test GET for Members of any group 
describe('GET /Members', () => {
  
    it('PASS, getting 10 group members', (done) => {
      request(app).get('/Members')
        .then((res) => {
          const body = res.body;
          expect(body.length).to.equal(10);
          done();
        })
        .catch((err) => done(err));
    });
  })