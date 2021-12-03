// process.env.NODE_ENV = 'test';
const request = require('supertest'); 
const app = require("../app.js");
const expect = require('chai').expect;
const conn = require("../db/index.js"); 


// test GET for All Groups
// Testing to see that the mockaroo sends back 10 groups
describe('GET /AllGroups ', () => {
    process.env.NODE_ENV = 'test';
    before((done) => {
      conn.connect()
        .then(() => done())
        .catch((err) => done(err));
    })
 
    it('PASS, getting All Groups when none have been created yet', (done) => {
        request(app).post("/Users")
        .send({
            username: "sj",
            password: "Clarke", 
            fName: "Sarah-Jane", 
            lName: "Clarke", 
            currentGroup:  " ", 
            allGroups: [], 
            friends: []
        })
      .then((res) => {  
      request(app).get('/AllGroups/sj')
        .then((res) => {
          const body = res.body;
          expect(body.length).to.equal(0);
          done();
        })
        .catch((err) => done(err));
    })
    
  })
})
   
