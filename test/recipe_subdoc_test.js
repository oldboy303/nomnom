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
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    Cookbook.findById(decoded.id)
      .then((result) => {
        request(app)
          .post(`/api/v1/cookbooks/${ token }/recipes`)
          .send({
            recipe: {
              name: 'Good Eats',
              yummlyId: '123123',
              imageURL: 'http://webaddress',
              course: 'Main Dishes',
              rating: 3,
              prepTime: 500
            }
          })
          .end((err, data) => {
            data.body.cookbook.recipes.length.should.equal(result.recipes.length + 1);
            done();
          });
      });
  });

  it('It should not save a recipe with missing data', (done) => {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    Cookbook.findById(decoded.id)
      .then((result) => {
        request(app)
          .post(`/api/v1/cookbooks/${ token }/recipes`)
          .send({
            recipe: {
              name: 'Good Eats',
              yummlyId: '123123',
              imageURL: 'http://webaddress',
              course: 'Main Dishes',
              rating: 3,
            }
          })
          .end((err, data) => {
            data.body.error.name.should.equal('ValidationError');
            done();
          });
      });
  });

  it('It should delete a recipe from a cookbook', (done) => {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    Cookbook.findById(decoded.id)
      .then((result) => {
        result.recipes.push({
          name: 'Good Eats',
          yummlyId: '123123',
          imageURL: 'http://webaddress',
          course: 'Main Dishes',
          rating: 3,
          prepTime: 500
        });
        return result.save();
      })
      .then((updated) => {
        request(app)
          .delete(
            `/api/v1/cookbooks/${ token }/recipes/123123`
          )
          .end((err, data) => {
            data.body.cookbook.recipes.length.should.equal(updated.recipes.length - 1);
            done();
          })
      })
  });
});
