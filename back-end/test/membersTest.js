process.env.NODE_ENV = 'test';

const expect = require("chai").expect; 
// const request = require("supertest")
// const app = require("../app.js");
// const { response } = require("express");
// const conn = require("../db/index.js"); 

// // test GET for Members of any group 
// describe('GET Members of a group', () => {
//     process.env.NODE_ENV = 'test';
//     before((done) => {
//       conn.connect()
//         .then(() => done())
//         .catch((err) => done(err));
//     })
//     it('PASS, getting 2 group members after creating a group', (done) => {
//         // make a group
//     request(app).post('/CreateGroup/?userInput=sj&groupName=Canada&friendAdded=clarkeAndrew')
//     .expect(200)
//     .then((res) => {
//       request(app).get('/Members/Canada')
//         .then((res) => {
//           const body = res.body;
//           expect(body).to.be.an("array")
//           done();
//         })
//         .catch((err) => done(err));
//     });
//   })
// })