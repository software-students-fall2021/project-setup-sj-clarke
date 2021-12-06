
process.env.NODE_ENV = 'test';

const chai = require('chai')
const expect = require("chai").expect; 
const request = require("supertest")
const app = require("../app.js");
const { response } = require("express");
let mongoose = require("mongoose");


describe('GET /AllGroups/:username ', () => {
    it('PASS, getting all friends of a user', (done) => {
      const user = "sjclarke"
      request(app).get(`/AllGroups/${user}`)
        .then((res) => {
          const body = res.body;
          expect(res.body).to.be.an("array")
          done();
        })
        .catch((err) => done(err));
    });
  })

