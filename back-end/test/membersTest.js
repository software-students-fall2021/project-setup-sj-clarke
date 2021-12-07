

const expect = require("chai").expect; 
const request = require("supertest")
const app = require("../app.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

// Members tests

describe('GET /Members', () => {
    // making 2 users 
    it('OK, making user 1', (done) => {
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
            chai.request(app).post('localhost/Users')
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
        // const group = "Mexico"
         chai.request(app).post('localhost/CreateGroup/')
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

    it('PASS, getting group members from this new group', (done) => {
      chai.request(app).get('localhost/Members/Maldives')
        .then((res) => {
          const body = res.body;
          expect(body).to.be.an("array");
          done();
        })
        .catch((err) => done(err));
    });
    it("PASS, Deleting group just created", (done) => {
        chai.request(app).delete('local/Group/Maldives')
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
        chai.request(app).delete('/Users/SJ')
        .then((res)=> {
            const body = res.body;
            expect(body).to.contain.property("status");
            done(); 
        })
        .catch((err) => done(err));
           
    })
    it("PASS, Deleting user 2 just created", (done) => {
        chai.request(app).delete('localhost/Users/oEbner')
        .then((res)=> {
            const body = res.body;
            expect(body).to.contain.property("status");
            done(); 
        })
        .catch((err) => done(err));
           
    })
})

