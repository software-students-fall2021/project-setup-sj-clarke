// ALL GROUPS TESTS

const chai = require('chai')
const expect = require("chai").expect; 
const request = require("supertest")
const app = require("../app.js");
const { response } = require("express");
let mongoose = require("mongoose");
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
// first need to make a user 
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
    // get all groups for this user we just made (should be no groups yet)
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
  // delete the user we made for this test (so DB not affected)
  describe('/AllGroups/:username tests: deleting user just created so DB not affected', () => {
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

