const app = require('../app.js');
const request = require('supertest');
const should = require('chai').should();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Cookbook = mongoose.model('Cookbook');

describe('Registration/create tests', () => {

  let props = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@test.com',
    password: 'wooot'
  };
  
  it('It should save a new cookbook to the DB', (done) => {
    Cookbook.count().then((count) => {
      request(app)
      .post('/api/v1/cookbooks/register')
      .send(props)
      .end(() => {
        Cookbook.count().then((newCount) => {
          newCount.should.equal(count + 1);
          done();
        });
      });
    });
  });

  it('It should store password as a hash', (done) => {
    request(app)
    .post('/api/v1/cookbooks/register')
    .send(props)
    .end(() => {
      Cookbook.findOne({ firstName: 'Jane' })
      .then((data) => {
        bcrypt.compareSync('wooot', data.password).should.equal(true);
        done();
      })
    });
  });

  it('It should return a jwt to the client', (done) => {
    request(app)
    .post('/api/v1/cookbooks/register')
    .send(props)
    .end((err, data) => {
      let decoded = jwt.verify(data.body.token, process.env.JWT_SECRET);
      decoded.id.should.equal(data.body.cookbook.id);
      done();
    });
  });

  it('It should return a clean cookbook', (done) => {
    request(app)
    .post('/api/v1/cookbooks/register')
    .send(props)
    .end((err, data) => {
      should.not.exist(data.body.cookbook.password);
      done();
    });
  });

  it('It should not save a cookbook with a duplicate email', (done) => {
    request(app)
    .post('/api/v1/cookbooks/register')
    .send(props)
    .end((err, data) => {
      request(app)
      .post('/api/v1/cookbooks/register')
      .send({
        firstName: 'Jim',
        lastName: 'Doe',
        email: 'jane@test.com',
        password: 'wooo'
      })
      .end((err, data) => {
        data.res.statusCode.should.equal(422);
        done();
      });
    });
  });

});
