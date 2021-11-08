process.env.NODE_ENV = 'test';

const expect = require("chai").expect; 
const request = require("supertest")
const app = require("../app.js");
const { response } = require("express");


// test GET 
// Testing to see that the mockaroo sends back 10 friends
describe('GET /CreateGroup', () => {
  
  it('PASS, creating 10 groups', (done) => {
    request(app).get('/CreateGroup')
      .then((res) => {
        const body = res.body;
        expect(body.length).to.equal(10);
        done();
      })
      .catch((err) => done(err));
  });

 
})

    // test POST 

    describe('POST /CreateGroup', () => {
      it('PASS, creating a new group works', (done) => {
        request(app).post('/CreateGroup')
          .send({ groupName: 'Mexico'})
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('status');
            expect(body).to.contain.property('groupName');
            done();
          })
          .catch((err) => done(err));
      });
    
      it('Fail, Creating a group by sending it through a new group', (done) => {
        request(app).post('/CreateGroup')
          .send({})
          .expect(200)
          .then((res) => {
            const body = res.body;
            expect(body.groupName)
              .to.equal(undefined)
            done();
          })
          .catch((err) => done(err));
      });
    })