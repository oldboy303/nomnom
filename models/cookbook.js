const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RecipeSchema = require('./recipe.js');

const CookbookSchema = new Schema({

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  recipes: [RecipeSchema]

});

const Cookbook = mongoose.model('Cookbook', CookbookSchema);

module.exports = Cookbook;
