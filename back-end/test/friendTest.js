process.env.NODE_ENV = 'test';

const expect = require("chai").expect; 
const request = require("supertest")
const app = require("../app.js");
const { response } = require("express");


// test GET 
// Testing to see that the mockaroo sends back 10 friends
describe('GET /Friends/:username', () => {
  it('PASS, getting friends of user with 1+ friends', (done) => {
    request(app).get('/Friends')
      .then((res) => {
        // select first friend 
        const body = res.body;
    
        expect(body.length).to.equal(10);
        done();
      })
      .catch((err) => done(err));
  });

 
})

    // test POST 

    describe('POST /Friends', () => {
      it('PASS, creating a new Friend works', (done) => {
        request(app).post('/Friends')
          .send({ friendAdded: 'Sarah-Jane'})
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('status');
            expect(body).to.contain.property('friendAdded');
            done();
          })
          .catch((err) => done(err));
      });
    
      it('Fail, Friend requires you to send through a Friend', (done) => {
        request(app).post('/Friends')
          .send({})
          .expect(404)
          .then((res) => {
            const body = res.body;
            expect(body.friendAdded)
              .to.equal(undefined)
            done();
          })
          .catch((err) => done(err));
      });
    })


