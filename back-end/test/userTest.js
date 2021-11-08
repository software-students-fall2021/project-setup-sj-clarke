process.env.NODE_ENV = 'test';

const expect = require("chai").expect; 
const request = require("supertest")
const app = require("../app.js");
const { response } = require("express");

// test GET 
// Testing to see that the mockaroo sends back 10 users
describe('GET /Users', () => {
  it('PASS, getting users has 10 users returned', (done) => {
    request(app).get('/Users')
      .then((res) => {
        const body = res.body;
        expect(body.length).to.equal(10);
        done();
      })
      .catch((err) => done(err));
  });
})
// test POST 
    describe('POST /Users', () => {
      it('PASS, creating a new User works', (done) => {
        request(app).post('/Users')
          .send({ first_name: 'Elizabeth', 
          last_name: "Jiranek", 
          username: "elizabethjiranek", 
          password: "Fall2021"
        })
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('status');
            expect(body).to.contain.property('first_name');
            expect(body).to.contain.property('last_name');
            expect(body).to.contain.property('username');
            expect(body).to.contain.property('password');
            done();
          })
          .catch((err) => done(err));
      });
    
      it('Fail, User requires you to send through a User', (done) => {
        request(app).post('/Users')
          .send({})
          .expect(200)
          .then((res) => {
            const body = res.body;
            expect(body.charger)
              .to.equal(undefined)
            done();
          })
          .catch((err) => done(err));
      });
    })


