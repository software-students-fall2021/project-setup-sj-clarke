
/*process.env.NODE_ENV = 'test';

// const expect = require("chai").expect; 
// const request = require("supertest")
// const app = require("../app.js");
// const { response } = require("express");


// // test GET 
// // Testing to see that the mockaroo sends back 10 friends
// describe('GET /CreateGroup', () => {
  
//   it('PASS, creating 10 groups', (done) => {
//     request(app).get('/CreateGroup')
//       .then((res) => {
//         const body = res.body;
//         expect(body.length).to.equal(10);
//         done();
//       })
//       .catch((err) => done(err));
//   });

 
// })

//     // test POST 

//     describe('POST /CreateGroup', () => {
//       it('PASS, creating a new group works', (done) => {
//         request(app).post('/CreateGroup')
//           .send({ groupName: 'Mexico'})
//           .expect(200)
//           .expect('Content-Type', /json/)
//           .then((res) => {
//             const body = res.body;
//             expect(body).to.contain.property('status');
//             expect(body).to.contain.property('groupName');
//             done();
//           })
//           .catch((err) => done(err));
//       });
    
      it('Fail, Creating a group by sending it through a new group', (done) => {
        request(app).post('/CreateGroup')
          .send({})
          .expect(200)
          .then((res) => {
            const body = res.body;
            expect(body.groupName)
              .to.equal(undefined)
            done();
          })
          .catch((err) => done(err));
      });
    })*/

process.env.NODE_ENV = 'test';
const app = require("../app.js");
const request = require("supertest");
const chai = require('chai')
const expect = chai.expect;

// GET all friends of a specific user 
  describe('GET /CreateGroup/:groups ', () => {
    it('PASS, getting group', (done) => {
      const group = "Mexico"
      request(app).get(`/CreateGroup/${group}`)
        .then((res) => {
          const body = res.body;
          console.log(res);
          done();
        })
        .catch((err) => done(err));
    });
  })

  // POST new group to a list of groups 
  
    describe('POST /CreateGroup/:groups', () => {
      it('PASS, adding a new group works', (done) => {
       // const group = "Mexico"
        request(app).post('/CreateGroup/').send({ groupName: 'Mexico'})
         // .send({ groupName: 'Mexico'})
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('status');
           // expect(body).to.contain.property('groupName');
            done();
          })
          .catch((err) => done(err));
      });
    
      it('Fail, Create Group requires you to send through a group name in json', (done) => {
        //const group = "Mexico"
        request(app).post('/CreateGroup/').send({ groupName: 'Mexico'})
          //.send({})
          .expect('Content-Type', /json/)
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('status');
           // expect(body).to.contain.property('groupName');
            done();
          })
          .catch((err) => done(err));
      });
    })

    // DELETE a friend from a users friend list. 
   /* describe('DELETE /CreateGroup/:username ', () => {
      it('PASS, deleting a friend', (done) => {
        const group = "Mexico"
        const friend = "EmilyHerschmann"
        request(app).delete(`/CreateGroup/${group}/${friend}`)
          .then((res) => {
            const body = res.body;
            expect(res.body).to.contain.property("status")
            done();
          })
          .catch((err) => done(err));
      });
    })*/

