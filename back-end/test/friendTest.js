
// FRIENDS TESTS 

const request = require('supertest'); 
const app = require("../app.js");
const expect = require('chai').expect;

// GET all friends of a specific user 
describe('/Friends tests ', () => {
  // make a user 
  it('OK, getting Friends', (done) => {
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
    // get friends 
      .then((res) => {
        request(app).get(`/Friends/${res.body.username}`)
          .then((res) => {
            const body = res.body;
            expect(body).be.an('array');
            done();
          })
      })
      .catch((err) => done(err));
  });
  // add a new friend
  it('OK, Posting friend works', (done) => {
        request(app).post('/Friends/SJ')
        .send({
              friendAdded: "amyClarke"
        })
          .then((res) => {
            const body = res.body;
              expect(body).to.contain.property("friendAdded");
              done();
            })
          .catch((err) => done(err));
      })
    })
      
    // deleting user just made so DB not affected 
describe('/Friends tests deleting user just created so DB not affected', () => {
    it("PASS, Deleting user just created", (done) => {
        request(app).delete('/Users/SJ')
        .then((res)=> {
            const body = res.body;
            expect(body).to.contain.property("status");
            done(); 
        })
        .catch((err) => done(err));
           
    })
})
         

  





