// process.env.NODE_ENV = 'test';

// const expect = require("chai").expect; 
// const request = require("supertest")
// const app = require("../app.js");
// const { response } = require("express");

// // test GET 
// // Testing to see that the mockaroo sends back 10 transactions
// describe('GET /Transactions', () => {
//   it('PASS, getting transactions has 10 transactions returned', (done) => {
//     request(app).get('/Transactions')
//       .then((res) => {
//         const body = res.body;
//         expect(body.length).to.equal(10);
//         done();
//       })
//       .catch((err) => done(err));
//   });
// })
// test POST 
//     describe('POST /Transactions', () => {
//       it('PASS, creating a new Transaction works', (done) => {
//         request(app).post('/Transactions')
//           .send({ date: 'July 7', 
//           group: "Mexico 2021", 
//           charger: "Sarah-Jane", 
//           chargee: "Clarke", 
//           amount: "20"
//         })
//           .expect(200)
//           .expect('Content-Type', /json/)
//           .then((res) => {
//             const body = res.body;
//             expect(body).to.contain.property('status');
//             expect(body).to.contain.property('date');
//             expect(body).to.contain.property('group');
//             expect(body).to.contain.property('charger');
//             expect(body).to.contain.property('chargee');
//             expect(body).to.contain.property('amount');
//             done();
//           })
//           .catch((err) => done(err));
//       });
//     })
            
// //       it('Fail, Transaction requires you to send through a charger', (done) => {
// //         request(app).post('/Friends')
// //           .send({ date: 'July 7', 
// //           group: "Mexico 2021",
// //           chargee: "Clarke", 
// //           amount: "20"
// //         })
// //           .expect(200)
// //           .then((res) => {
// //             const body = res.body;
// //             expect(body.charger)
// //               .to.equal(undefined)
// //             done();
// //           })
// //           .catch((err) => done(err));
//       });
//     })
