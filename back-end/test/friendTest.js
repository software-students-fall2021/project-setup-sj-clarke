
// FRIENDS TESTS 
process.env.NODE_ENV = 'test';
const app = require("../app.js");
const request = require("supertest");
const chai = require('chai')
const expect = chai.expect;

// GET all friends of a specific user 
  describe('GET /Friends/:username ', () => {
    it('PASS, getting all friends of a user', (done) => {
      const user = "sjclarke"
      request(app).get(`/Friends/${user}`)
        .then((res) => {
          const body = res.body;
          expect(res.body).to.be.an("array")
          done();
        })
        .catch((err) => done(err));
    });
  })

  // POST friend to a users friend list 
    describe('POST /Friends/:username', () => {
      it('PASS, adding a new Friend works', (done) => {
        const user = "sjclarke"
        request(app).post(`/Friends/${user}`)
          .send({ friendAdded: 'Sarah-Jane'})
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('status');
            expect(body).to.contain.property('friendAdded');
            done();
          })
          .catch((err) => done(err));
      });
    
      it('Fail, Friend requires you to send through a friend name in json', (done) => {
        const user = "sjclarke"
        request(app).post(`/Friends/${user}`)
          .send({})
          .expect('Content-Type', /json/)
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('status');
            done();
          })
          .catch((err) => done(err));
      });
    })

    // DELETE a friend from a users friend list. 
    describe('DELETE /Friends/:username ', () => {
      it('PASS, deleting a friend', (done) => {
        const user = "sjclarke"
        const friend = "clarkeLewis"
        request(app).delete(`/Friends/${user}/${friend}`)
          .then((res) => {
            const body = res.body;
            expect(res.body).to.contain.property("status")
            done();
          })
          .catch((err) => done(err));
      });
    })
