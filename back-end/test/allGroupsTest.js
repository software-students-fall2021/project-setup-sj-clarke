
process.env.NODE_ENV = 'test';

const chai = require('chai')
const expect = require("chai").expect; 
const request = require("supertest")
const app = require("../app.js");
const { response } = require("express");
let mongoose = require("mongoose");


  
describe('GET /AllGroups/:username ', () => {
    it('PASS, getting all friends of a user', (done) => {
      const user = "sjclarke"
      request(app).get(`/AllGroups/${user}`)
        .then((res) => {
          const body = res.body;
          expect(res.body).to.be.an("array")
          done();
        })
        .catch((err) => done(err));
    });
  })
// // test GET for All Groups
// // Testing to see that the mockaroo sends back 10 groups
// const getGroups = jest.fn() 

// const app2 = makeApp({
//     getAllGroups
// })

// describe('GET /AllGroups ', async () => {
//     it('PASS, getting All Groups when none have been created yet', (done) => {
//      request(app).get("/AllGroups")
//       expect(getAllGroups.mock.calls.length).toBe(1)
    
//   })
