

const expect = require("chai").expect; 
const request = require("supertest")
const app = require("../app.js");


// test GET for Current group of a user

describe('GET /CurrentGroup', () => {
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

    // make a group to test 
    it('PASS, create a new group to get members from', (done) => {
         request(app).post('/CreateGroup/')
         .send({
             groupName: "Maldives", 
             friendAdded: "oEbner", 
             userInput: "SJ"
         })
           .expect(200)
           .then((res) => {
             const body = res.body;
             expect(body).to.contain.property('status');
            // expect(body).to.contain.property('groupName');
             done();
           })
           .catch((err) => done(err));
        })

    // current group should be the group just created by this user 
    it('PASS, getting current group', (done) => {
      request(app).get('/CurrentGroup/SJ')
        .then((res) => {
          const body = res.body;
          expect(body).to.be.a("string");
          done();
        })
        .catch((err) => done(err));
    });
    

    // delete so DB is not affected
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

  describe('/CurrentGroup tests deleting user just created so DB not affected', () => {
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


   
  