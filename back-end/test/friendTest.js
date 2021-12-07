
// FRIENDS TESTS 
const app = require("../app.js");
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

// GET all friends of a specific user 
describe('/Friends tests ', () => {
  it('OK, getting Friends', (done) => {
    chai.request(app).post('localhost/Users')
      .send({
        username: "SJ",
        password: "Clarke", 
        fName: "Sarah-Jane", 
        lName: "Clarke", 
        currentGroup:  " ", 
        allGroups: [], 
        friends: []
    })
      .then((res) => {
        chai.request(app).get(`localhost/Friends/${res.body.username}`)
          .then((res) => {
            const body = res.body;
            expect(body).be.an('array');
            done();
          })
      })
      .catch((err) => done(err));
  });
  it('OK, Posting friend works', (done) => {
        chai.request(app).post('localhost/Friends/SJ')
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
      
describe('/Friends tests deleting user just created so DB not affected', () => {
    it("PASS, Deleting user just created", (done) => {
        chai.request(app).delete('localhost/Users/SJ')
        .then((res)=> {
            const body = res.body;
            expect(body).to.contain.property("status");
            done(); 
        })
        .catch((err) => done(err));
           
    })
})
         

  





