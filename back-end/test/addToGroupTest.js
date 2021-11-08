process.env.NODE_ENV = 'test';

const expect = require("chai").expect; 
const request = require("supertest")
const app = require("../app.js");
const { response } = require("express");

// testing a POST for adding new friend to a group 
describe('POST /AddToGroup', () => {
    it('PASS, adding new friend to a group works', (done) => {
      request(app).post('/AddToGroup')
        .send({ 
        friend: 'Sarah-Jane', 
        groupName: "Mexico 2021"})
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          const body = res.body;
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('friend');
          expect(body).to.contain.property('groupName');
          done();
        })
        .catch((err) => done(err));
    });
  
    it('Fail, adding a new friend to group requires you to send through group name', (done) => {
      request(app).post('/AddToGroup')
        .send({friend: "Sarah-Jane"})
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