process.env.NODE_ENV = 'test';
const app = require("../app.js");
const request = require("supertest");
const chai = require('chai')
const expect = chai.expect;
// CREATE GROUP TEST

    describe('/CreateGroup making users', () => {
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

    
  // POST new group for one of these users, using one user as the creator and the other as the friend added. 
    describe('/CreateGroup/ making new group', () => {
      it('PASS, adding a new group works', (done) => {
        request(app).post("/CreateGroup?userInput=SJ&groupName=China&friendAdded=oEbner")
          .expect(200)
          .then((res) => {
            
            const body = res.body;
            expect(body).to.contain.property('status');
            done();
          })
          .catch((err) => done(err));
      })
    })
        
        
// deleting group and users just made for this test 
    describe('/CreateGroup/ deleting group just created', () => {
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

  describe('/CreateGroup deleting user just created so DB not affected', () => {
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


    
 

