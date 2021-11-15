process.env.NODE_ENV = 'test';

const expect = require("chai").expect; 
const request = require("supertest")
const app = require("../app.js");
const { response } = require("express");
const chaiHttp = require('chai-http')
const server = requir('../server.js')
chai.use(chaiHttp)

before((done) => {
  user.deleteMany({}, function(err) {} ); 
  done(); 
})
after((done) => {
  user.deleteMany({}, function(err) {} ); 
  done(); 
})

// test GET 
// Testing to see that the mockaroo sends back 10 transactions
describe('GET /Transactions/:id', () => {
  it('PASS, getting transactions for group with existing transactions', (done) => {
    // create a new group with 1 transaction 
    let group_practice = {
      name:  "LA", 
      date: "2020",
      members: ["sjclarke", "clarkeAndrew"], 
      transactions:  [ {
        charger: "EmilyHerschmann", 
        chargee: "ElizabethJiranek", 
        amount: "200", 
        date: "12/11/2021"
      }
    ]
    }
      request(app).get('/Transactions/LA')
      .then((res) => {
        const body = res.body[0].transactions[0];
        expect(body).to.contain.property('date');
        expect(body).to.contain.property('charger');
        expect(body).to.contain.property('chargee');
        expect(body).to.contain.property('amount');
        done();
      })
      .catch((err) => done(err));
  });
})
// GET transactions for a new group with no transactions yet 
describe('GET /Transactions/LA', () => {
  it('PASS, getting transactions for group with no existing transactions', (done) => {
    request(app).get('/Transactions/LA')
      .then((res) => {
        const body = res.body[0].transactions;
        expect(body.length).to.equal(0);            
        done();
      })
      .catch((err) => done(err));
  });
})

// test POST 
    describe('POST /Transactions', () => {
      it('PASS, creating a new Transaction works', (done) => {
        request(app).post('/Transactions')
          .send({ date: 'July 7', 
          charger: "Sarah-Jane", 
          chargee: "Clarke", 
          amount: "20"
        })
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('status');
            expect(body).to.contain.property('date');
            expect(body).to.contain.property('group');
            expect(body).to.contain.property('charger');
            expect(body).to.contain.property('chargee');
            expect(body).to.contain.property('amount');
            done();
          })
          .catch((err) => done(err));
      });
    
      it('Fail, Transaction requires you to send through a charger', (done) => {
        request(app).post('/Friends')
          .send({ date: 'July 7', 
          group: "Mexico 2021",
          chargee: "Clarke", 
          amount: "20"
        })
          .expect(404)
          .then((res) => {
            const body = res.body;
            expect(body.charger)
              .to.equal(undefined)
            done();
          })
          .catch((err) => done(err));
      });
    })


