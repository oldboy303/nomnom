const app = require('../app.js');
const request = require('supertest');
const should = require('chai').should();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cookbook = require('../models/cookbook.js');
require('dotenv').load();

describe('Login tests', () => {

  beforeEach((done) => {
    let salt = bcrypt.genSaltSync();
    let hash = bcrypt.hashSync('woot', salt);
    let cookbook = new Cookbook({
      firstName: 'Joe',
      lastName: 'Doe',
      email: 'jd@test.com',
      password: hash
    });
    cookbook.save()
      .then(() => done())
      .catch(() => done());
  });

  it('It should find a cookbook in the DB by email', (done) => {
    request(app)
    .post('/api/v1/cookbooks/login')
    .send({
      email: 'jd@test.com',
      password: 'woot'
    })
    .end((err, result) => {
      let cb = result.body.cookbook;
      cb.email.should.equal('jd@test.com');
      done();
    });
  });

  it('It should return a cookbook', (done) => {
    request(app)
    .post('/api/v1/cookbooks/login')
    .send({
      email: 'jd@test.com',
      password: 'woot'
    })
    .end((err, result) => {
      let cb = result.body.cookbook;
      cb.firstName.should.equal('Joe');
      cb.lastName.should.equal('Doe');
      cb.recipes.should.have.length(0);
      done();
    });
  });

  it('It should return a jwt', (done) => {
    request(app)
    .post('/api/v1/cookbooks/login')
    .send({
      email: 'jd@test.com',
      password: 'woot'
    })
    .end((err, result) => {
      let decoded = jwt.verify(result.body.token, process.env.JWT_SECRET);
      decoded.id.should.equal(result.body.cookbook.id);
      done();
    });
  });

});
