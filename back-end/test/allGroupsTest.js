
process.env.NODE_ENV = 'test';

const chai = require('chai')
const expect = require("chai").expect; 
const request = require("supertest")
const app = require("../app.js");
const { response } = require("express");
let mongoose = require("mongoose");


describe('GET /AllGroups/:username ', () => {

  it('OK, making user 1', (done) => {
    request(app).post('/Users')
      .send({
        username: "SJ",
        password: "Clarke", 
        fName: "Sarah-Jane", 
        lName: "Clarke", 
        currentGroup:  " ", 
        allGroups: [], 
        friends: []
    })
    .expect(200)
       .then((res) => {
         const body = res.body;
         expect(body).to.contain.property('username');
         expect(body).to.contain.property('password');
         expect(body).to.contain.property('fName');
         expect(body).to.contain.property('lName');
         done();
       })
    })
    it('PASS, getting all friends of a user', (done) => {
      request(app).get(`/AllGroups/SJ`)
        .then((res) => {
          const body = res.body;
          expect(res.body).to.be.an("array")
          done();
        })
        .catch((err) => done(err));
    });
  })
  describe('/AllGroups tests deleting user just created so DB not affected', () => {
    it("PASS, Deleting user 1 just created", (done) => {
        request(app).delete('/Users/SJ')
        .then((res)=> {
            const body = res.body;
            expect(body).to.contain.property("status");
            done(); 
        })
        .catch((err) => done(err));
           
    })
  })

