// process.env.NODE_ENV = 'test';

// const expect = require("chai").expect; 
// const request = require("supertest")
// const app = require("../app.js");
// const { response } = require("express");
// const conn = require("../db/index.js"); 



// // test for getting a users current group 
// describe('GETTING current group and current group members', () => {
//     process.env.NODE_ENV = 'test';
//     before((done) => {
//         conn.connect()
//         .then(() => done())
//         .catch((err) => done(err));
//     })

//     // user for sj was just created and we made a group called Bahamas so that should be current group 
//     it('PASS, getting current group works', (done) => {
//         request(app).post('/CreateGroup/?userInput=sj&groupName=Bahamas&friendAdded=clarkeAmy')
//           .expect(200)
//           .then((res) => {
//             request(app).get('/CurrentGroup/sj')
//             .expect(200)
//             .then((res) => {
//                 const body = res.body; 
//                 expect(body).to.be.a("string")
//                 done();
//             })
//         })
//           .catch((err) => done(err));
//       });

// // test GET for Current Group Members 
//     it('PASS, getting 2 group members of bahamas, trip just created', (done) => {
//         request(app).post('/CreateGroup/?userInput=sj&groupName=Bahamas&friendAdded=clarkeAmy')
//           .expect(200)
//           .then((res) => {
//             request(app).get('/CurrentGroupMembers/sj')
//                 .then((res) => {
//                     const body = res.body;
//                     expect(body).to.be.an("array")
//                     done();
//                 })
//             })
//         .catch((err) => done(err));
//     });

//   })




   
  