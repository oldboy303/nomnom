const app = require('../app.js');
const request = require('supertest');
const should = require('chai').should();
const jwt = require('jsonwebtoken');
const Cookbook = require('../models/cookbook.js');
require('dotenv').load();

describe('Delete tests', () => {

  it('It should delete a cookbook', (done) => {
    Cookbook.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      password: 'trash'
    })
      .then((result) => {
        let token = jwt.sign({ id: result._id }, process.env.JWT_SECRET);
        request(app)
          .delete(`/api/v1/cookbooks/${ result._id }?token=${ token }`)
          .end(() => {
            Cookbook.findById(result.id)
              .then((data) => {
                should.not.exist(data);
                done();
              })
          })
      })
  });

});
