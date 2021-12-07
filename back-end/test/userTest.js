
// Users TESTS 
// makes sure the connection is to a mock database not the actual db. 
const request = require('supertest'); 
const app = require("../app.js");
const expect = require('chai').expect;
const conn = require("../db/index.js"); 
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

// GET all friends of a specific user 
describe('Testing /Users GET', () => {
    it('PASS, getting Users works', (done) => {
        chai.request(app).get('localhost/Users')
          .then((res) => { 
            expect(res.body).to.be.an("array")
            done(); 
          })
          .catch((err) => done(err));
      })

describe('Testing /Users POST ', () => {
  it('PASS, POST user worked', (done) => {
    chai.request(app).post("localhost/Users")
    .send({
        username: "olivia",
        password: "Clarke", 
        fName: "Sarah-Jane", 
        lName: "Clarke", 
        currentGroup:  " ", 
        allGroups: [], 
        friends: []
    })
  .then((res) => {
      const body = res.body; 
      expect(body).to.contain.property("username"); 
      expect(body).to.contain.property("password"); 
      expect(body).to.contain.property("lName"); 
      expect(body).to.contain.property("fName"); 
      expect(body).to.contain.property("currentGroup"); 
      expect(body).to.contain.property("friends"); 
      expect(body).to.contain.property("allGroups"); 
      done(); 
  })
  .catch((err) => done(err));
})
})

describe('/Users DELETE', () => {
    it("PASS, Deleting user works", (done) => {
        chai.request(app).delete('/Users/olivia')
        .then((res)=> {
            const body = res.body;
            expect(body).to.contain.property("status");
            done(); 
        })
        .catch((err) => done(err));
           
    })
})



})
