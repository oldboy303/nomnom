const app = require('../app.js');
const request = require('supertest');
const should = require('chai').should();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cookbook = require('../models/cookbook.js');

describe('Read tests', () => {
  it('It should return a jwt and clean cookbook to the user', (done) => {
    request(app)
    .post('/api/v1/cookbooks/register')
    .send({
      firstName: 'Joe',
      lastName: 'Doe',
      email: 'joe@test.com',
      password: 'woot'
    })
    .end((err, data) => {
      request(app)
      .get(`/api/v1/cookbooks/${ data.body.cookbook.id }?token=${ data.body.token }`)
      .end((err, data) => {
        let cb = data.body.cookbook;
        let salt = bcrypt.genSaltSync();
        let hash = bcrypt.hashSync('woot', salt);
        cb.firstName.should.equal('Joe');
        cb.lastName.should.equal('Doe');
        cb.email.should.equal('joe@test.com');
        should.not.exist(cb.password);
        should.exist(data.body.token);
      });
      done();
    });
  });
});
