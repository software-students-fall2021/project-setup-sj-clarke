process.env.NODE_ENV = 'test';

const expect = require("chai").expect; 
const request = require("supertest")
const app = require("../app.js");
const { response } = require("express");

// Testing Transactions 

describe('GET /Transactions', () => {
    // make users to put in group 
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
    it('PASS, create a new group to get transactions from', (done) => {
         request(app).post("/CreateGroup/?userInput=SJ&groupName=Maldives&friendAdded=oEbner")
           .expect(200)
           .then((res) => {
             const body = res.body;
             expect(body).to.contain.property('status');
            // expect(body).to.contain.property('groupName');
             done();
           })
           .catch((err) => done(err));
        })

        it('PASS, posting transaction into this new group', (done) => {
            request(app).post('/Transactions/Maldives')
            .send({
                charger: "SJ", 
                chargee: {
                    "oEbner": 0
                }, 
                amount: "500", 
                description: "Dinner and drinks", 
                date: "2021-10-26", 
            })
              .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("charger");
                expect(body).to.contain.property("chargee");
                expect(body).to.contain.property("amount");
                expect(body).to.contain.property("description");
                expect(body).to.contain.property("date");
                done();
              })
              .catch((err) => done(err));
          });

    it('PASS, getting transactions from this new group', (done) => {
      request(app).get('/Transactions/Maldives')
        .then((res) => {
          const body = res.body;
          expect(body).have.lengthOf(1);
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