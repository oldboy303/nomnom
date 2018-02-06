const app = require('../app.js');
const request = require('supertest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cookbook = require('../models/cookbook.js');
require('dotenv').load();

describe('Update tests', () => {
  let token;

  beforeEach((done) => {
    let salt = bcrypt.genSaltSync();
    let hash = bcrypt.hashSync('woot', salt);
    Cookbook.create({
      firstName: 'Joe',
      lastName: 'Doe',
      email: 'joe@test.com',
      password: hash
    })
      .then((cb)=> {
        token = jwt.sign({ id: cb._id }, process.env.JWT_SECRET);
        done();
      })
      .catch(() => done());
  });

  it('It should update a cookbook\'s password', (done) => {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    request(app)
      .put(`/api/v1/cookbooks/${ decoded.id }`)
      .send({
        oldPassword: 'woot',
        newPassword: 'pass',
        token: token
      })
      .end(() => {
        Cookbook.findById(decoded.id)
          .then((result) => {
            bcrypt.compareSync('pass', result.password).should.equal(true);
            done();
          });
      });
  });

  it('It should update a cookbook\'s email', (done) => {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    request(app)
      .put(`/api/v1/cookbooks/${ decoded.id }`)
      .send({
        newEmail: 'jd@test.com',
        token: token
      })
      .end(() => {
        Cookbook.findById(decoded.id)
          .then((result) => {
            result.email.should.equal('jd@test.com');
            done();
          });
      });
  });

  it('It should not update a cookbook\'s email if not unique', (done) => {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    Cookbook.create({
      firstName: 'John',
      lastName: 'Doe', 
      email: 'jd@test.com',
      password: 'test'
    })
      .then(() => {
        request(app)
          .put(`/api/v1/cookbooks/${ decoded.id }`)
          .send({
            newEmail: 'jd@test.com',
            token: token
          })
          .end((err, data) => {
            data.body.error.should.equal('Email is already taken');
            done();
          });
      });
  });

});
