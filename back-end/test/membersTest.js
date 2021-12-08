

const expect = require("chai").expect; 
const request = require("supertest")
const app = require("../app.js");


// Members tests

describe('POST /Members', () => {
    // making 2 users 
    it('OK, making user 1', (done) => {
        request(app).post('/Users')
          .send({
            username: "Sclarke",
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
                username: "sM",
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

    
    // make a group to test 
    it('PASS, create a new group to get members from', (done) => {
         request(app).post('/CreateGroup?userInput=Sclarke&groupName=Maldives&friendAdded=sM')
           .expect(200)
           .then((res) => {
             const body = res.body;
             expect(body).to.contain.property('status');
            // expect(body).to.contain.property('groupName');
             done();
           })
           .catch((err) => done(err));
        })
      })

  describe('GET /Members', () => {

    it('PASS, getting group members from this new group', (done) => {
      request(app).get('/Members/Maldives')
        .then((res) => {
          const body = res.body;
          expect(body).to.be.an("array");
          done();
        })
        .catch((err) => done(err));
    });
    it("PASS, Deleting group just created", (done) => {
        request(app).delete('/Group/Maldives')
        .then((res)=> {
            const body = res.body;
            expect(body).to.contain.property("status");
            expect(body).to.contain.property("groupDeleted");
            done(); 
        })
        .catch((err) => done(err));
           
    })

  })

  describe('/Members tests deleting user just created so DB not affected', () => {
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

