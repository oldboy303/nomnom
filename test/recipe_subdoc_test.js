const app = require('../app');
const request = require('supertest');
const should = require('chai').should();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Cookbook = mongoose.model('Cookbook');
require('dotenv').load();

describe('Recipe subdoc tests', () => {
  let token;

  beforeEach((done) => {
    Cookbook.create({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@test.com',
      password: 'woot'
    })
    .then((result) => {
      token = jwt.sign({ id: result._id }, process.env.JWT_SECRET);
      done();
    })
  });

  it('It should save a recipe to a cookbook', (done) => {
    
  });

  it('It should not save a recipe with missing data', (done) => {

  });

  it('It should delete a recipe from a cookbook', (done) => {
  });
});
