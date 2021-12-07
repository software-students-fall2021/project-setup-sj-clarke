process.env.NODE_ENV = 'test';
const app = require("../app.js");
const request = require("supertest");
const chai = require('chai')
const expect = chai.expect;


// GET all friends of a specific user 
  describe('GET /CreateGroup/:groups ', () => {
    it('PASS, getting group', (done) => {
      const group = "China"
      request(app).get(`localhost/CreateGroup/${group}`)
        .then((res) => {
          const body = res.body;
          console.log(res);
          done();
        })
        .catch((err) => done(err));
    });
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

  // POST new group to a list of groups 
  
    describe('POST /CreateGroup/:groups', () => {
      it('PASS, adding a new group works', (done) => {
       // const group = "Mexico"
        request(app).post('/CreateGroup/').send({ groupName: 'China' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('status');
           // expect(body).to.contain.property('groupName');
            done();
          })
          .catch((err) => done(err));
      })
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
      })
      it("PASS, Deleting group just created", (done) => {
        request(app).delete('/Group/Mexico')
        .then((res)=> {
            const body = res.body;
            expect(body).to.contain.property("status");
            expect(body).to.contain.property("groupDeleted");
            done(); 
        })
        .catch((err) => done(err));
           
    })
    })

 

