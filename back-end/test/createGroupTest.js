process.env.NODE_ENV = 'test';
const app = require("../app.js");
const request = require("supertest");
const chai = require('chai')
const expect = chai.expect;


    describe('POST /CreateGroup', () => {
      // making 2 users 
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
  
          it('OK, making user 2', (done) => {
              request(app).post('/Users')
                .send({
                  username: "oEbner",
                  password: "1234", 
                  fName: "Olivia", 
                  lName: "Ebner", 
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
    })

    

  // POST new group to a list of groups 
    describe('POST /CreateGroup/', () => {
      it('PASS, adding a new group works', (done) => {
        request(app).post("/CreateGroup?userInput=SJ&groupName=China&friendAdded=oEbner")
          .expect(200)
          .then((res) => {
            
            const body = res.body;
            expect(body).to.contain.property('status');
           // expect(body).to.contain.property('groupName');
            done();
          })
          .catch((err) => done(err));
      })
      it("PASS, Deleting group just created", (done) => {
        request(app).delete('/Group/China')
        .then((res)=> {
            const body = res.body;
            expect(body).to.contain.property("status");
            expect(body).to.contain.property("groupDeleted");
            done(); 
        })
        .catch((err) => done(err));
           
    })
  })

  describe('/CreateGroup tests deleting user just created so DB not affected', () => {
    it("PASS, Deleting user 1 just created", (done) => {
        request(app).delete('/Users/SJ')
        .then((res)=> {
            const body = res.body;
            expect(body).to.contain.property("status");
            done(); 
        })
        .catch((err) => done(err));
           
    })
    it("PASS, Deleting user 2 just created", (done) => {
        request(app).delete('/Users/oEbner')
        .then((res)=> {
            const body = res.body;
            expect(body).to.contain.property("status");
            done(); 
        })
        .catch((err) => done(err));
           
    })
})


    
 

