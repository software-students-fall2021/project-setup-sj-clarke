
// FRIENDS TESTS 
// makes sure the connection is to a mock database not the actual db. 
const request = require('supertest'); 
const app = require("../app.js");
const expect = require('chai').expect;
const conn = require("../db/index.js"); 

// GET all friends of a specific user 
describe('GET /Friends ', () => {
      process.env.NODE_ENV = 'test';
      before((done) => {
        conn.connect()
          .then(() => done())
          .catch((err) => done(err));
      })
    

  it('OK, getting Friends without adding has 0 friends', (done) => {
    request(app).post('/Users')
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
        request(app).get(`/Friends/${res.body.username}`)
          .then((res) => {
            const body = res.body;
            expect(body.length).to.equal(0);
            done();
          })
      })
      .catch((err) => done(err));
  });

  it('OK, getting Friends after adding friend', (done) => {
    request(app).post('/Users')
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
        request(app).post('/Friends/sj')
        .send({
              friendAdded: "sjclarke"
        })
          .then((res) => {
            request(app).get(`/Friends/sj`)
            .then((res) => {
              const body = res.body;
              expect(body).to.be.an("array");
              done();
            })
            
          })
      })
      .catch((err) => done(err));
      })
        
      
  });

  





